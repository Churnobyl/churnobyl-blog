import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import { supabase } from "./getSupabase";

interface DBRequest {
  slug: string;
  type: string;
  deviceId: string;
}

export default async function handler(
  req: GatsbyFunctionRequest<DBRequest>,
  res: GatsbyFunctionResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "허용되지 않는 메서드예요" });
  }

  const { slug, type, deviceId } = req.body;

  // "unlike"를 허용하도록 조건 추가
  if (!slug || !["view", "like", "unlike"].includes(type) || !deviceId) {
    return res.status(400).json({ error: "올바르지 않은 요청이에요요" });
  }

  try {
    // 1. `post` 테이블에 slug 존재 여부 확인
    const { data: postData, error: postError } = await supabase
      .from("post")
      .select("slug, view_cnt, like_cnt")
      .eq("slug", slug)
      .single();

    let post = postData;

    // 2. `post`가 없으면 추가
    if (!post) {
      const { data: newPost, error: insertPostError } = await supabase
        .from("post")
        .insert({
          slug,
          view_cnt: 0,
          like_cnt: 0,
        })
        .select("slug, view_cnt, like_cnt")
        .single();

      if (insertPostError) throw insertPostError;

      post = newPost; // 새로 생성한 `post`로 업데이트
    }

    // 3. 좋아요 요청 처리
    if (type === "like" || type === "unlike") {
      // 좋아요 상태 확인
      const { data: interaction, error: interactionError } = await supabase
        .from("post_interaction")
        .select("*")
        .eq("slug", slug)
        .eq("device_id", deviceId)
        .eq("type", "like")
        .single();

      if (type === "like") {
        if (interaction) {
          // 이미 좋아요를 눌렀으면 바로 반환
          return res.status(200).json({
            viewCnt: post.view_cnt || 0,
            likeCnt: post.like_cnt || 0,
            message: "Already liked",
          });
        }

        // 좋아요 추가
        await supabase.from("post_interaction").insert({
          slug,
          device_id: deviceId,
          type: "like",
        });

        const { data: updatedPost, error: updateError } = await supabase
          .from("post")
          .update({ like_cnt: (post.like_cnt || 0) + 1 })
          .eq("slug", slug)
          .select("view_cnt, like_cnt")
          .single();

        if (updateError) throw updateError;

        return res.status(200).json({
          viewCnt: updatedPost?.view_cnt || 0,
          likeCnt: updatedPost?.like_cnt || 0,
          message: "Like added",
        });
      } else if (type === "unlike") {
        if (!interaction) {
          // 좋아요가 없는 경우 바로 반환
          return res.status(200).json({
            viewCnt: post.view_cnt || 0,
            likeCnt: post.like_cnt || 0,
            message: "Already unliked",
          });
        }

        // 좋아요 취소
        await supabase
          .from("post_interaction")
          .delete()
          .eq("id", interaction.id);

        const { data: updatedPost, error: updateError } = await supabase
          .from("post")
          .update({ like_cnt: (post.like_cnt || 0) - 1 })
          .eq("slug", slug)
          .select("view_cnt, like_cnt")
          .single();

        if (updateError) throw updateError;

        return res.status(200).json({
          viewCnt: updatedPost?.view_cnt || 0,
          likeCnt: updatedPost?.like_cnt || 0,
          message: "Like removed",
        });
      }
    }

    // 4. 조회수 처리
    const { data: viewInteraction, error: viewInteractionError } =
      await supabase
        .from("post_interaction")
        .select("*")
        .eq("slug", slug)
        .eq("device_id", deviceId)
        .eq("type", "view")
        .single();

    if (!viewInteraction) {
      await supabase.from("post_interaction").insert({
        slug,
        device_id: deviceId,
        type: "view",
      });

      const { data: updatedPost, error: updateError } = await supabase
        .from("post")
        .update({ view_cnt: (post.view_cnt || 0) + 1 })
        .eq("slug", slug)
        .select("view_cnt, like_cnt")
        .single();

      if (updateError) throw updateError;

      return res.status(200).json({
        viewCnt: updatedPost?.view_cnt || 0,
        likeCnt: updatedPost?.like_cnt || 0,
      });
    }

    const { data: likeInteraction } = await supabase
      .from("post_interaction")
      .select("*")
      .eq("slug", slug)
      .eq("device_id", deviceId)
      .eq("type", "like")
      .single();

    return res.status(200).json({
      viewCnt: post.view_cnt || 0,
      likeCnt: post.like_cnt || 0,
      liked: !!likeInteraction,
      message: "View recorded",
    });
  } catch (error) {
    console.error("Error updating post interaction:", error);
    res.status(500).json({ error: "Failed to update post interaction" });
  }
}

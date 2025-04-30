import { GatsbyNode } from "gatsby";
import { createPosts } from "./gatsby/createPosts";
import { createPostList } from "./gatsby/createPostList";
import { createPostListByTag } from "./gatsby/createPostListByTag";
import { createPostListByCategory } from "./gatsby/createPostListByCategory";
import { createBookPage } from "./gatsby/createBookPage";

export const createPages: GatsbyNode[`createPages`] = async ({
  actions,
  graphql,
}) => {
  const { createPage } = actions;

  // 데이터가 완전히 로드될 때까지 잠시 기다림
  await new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    await createPostList(graphql, createPage);
    await createPosts(graphql, createPage);
    await createPostListByTag(graphql, createPage);
    await createPostListByCategory(graphql, createPage);
    await createBookPage(graphql, createPage);
  } catch (error) {
    console.error("Error during page creation:", error);
  }
};

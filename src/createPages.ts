import { GatsbyNode } from "gatsby";
import { createPosts } from "./gatsby/createPosts";
import { createPostList } from "./gatsby/createPostList";

export const createPages: GatsbyNode[`createPages`] = async ({
  actions,
  graphql,
}) => {
  const { createPage } = actions;

  await createPostList(graphql, createPage);
  await createPosts(graphql, createPage);
  // await createPostListByTag(graphql, createPage);
  // await createPostListByCategory(graphql, createPage);
};

export { createPages } from "./src/createPages";

// 스키마 커스터마이징 추가
import { GatsbyNode } from "gatsby";

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions }) => {
    const { createTypes } = actions;
    const typeDefs = `
    type NCategory implements Node {
      childrenChurnotion: [Churnotion] @link
      childrenNCategory: [NCategory] @link
    }
    type NTag implements Node {
      childrenChurnotion: [Churnotion] @link
    }
  `;
    createTypes(typeDefs);
  };

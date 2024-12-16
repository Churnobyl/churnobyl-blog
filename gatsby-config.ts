import type { GatsbyConfig } from "gatsby";
import adapter from "gatsby-adapter-netlify";

require("dotenv").config();

const config: GatsbyConfig = {
  adapter: adapter(),

  siteMetadata: {
    title: `Churnobyl Tech Blog`,
    description: `상상을 현실로 만들기 위해 노력하는 개발자 테크 블로그입니다.`,
    image: `./src/images/blog-icon.png`,
    siteUrl: `https://blog.churnobyl.com`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    // `gatsby-plugin-ts-config`,
    // `gatsby-plugin-typescript`,
    // `gatsby-plugin-postcss`,
    // `gatsby-transformer-remark`,
    // `gatsby-transformer-json`,
    // "gatsby-plugin-mdx",
    `gatsby-plugin-material-ui`,
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: `gatsby-source-notion-churnotion`,
      options: {
        token: process.env.GATSBY_INTEGRATION_TOKEN,
        databaseId: process.env.GATSBY_DATABASE_ID,
        bookDatabaseId: process.env.GATSBY_BOOK_DATABASE_ID,
      },
    },
  ],
};

export default config;

import { IGatsbyImageData } from "gatsby-plugin-image";
import { ITag } from "./ISummarizedPost";

export interface IBooks {
  book: IBook[];
}

export interface IBook {
  update_date: any;
  create_date: any;
  book_name: string;
  id: string;
  url: string;
  book_image: {
    childrenImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    }[];
  };
  book_category: {
    category_name: string;
    id: string;
    url: string;
  };
  childrenChurnotion?: IChildChurnotion[];
  description?: string;
}

export interface IChildChurnotion {
  title: string;
  book_index: number;
  thumbnail: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
  id: string;
  description: string;
  url: string;
  tags?: ITag[];
}

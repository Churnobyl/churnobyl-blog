export interface ISummarizedPost {
  id: number;
  title: string;
  categories: ICategory[];
  created_date: string;
  updated_date: string;
  description: string;
  tags: ITag[];
  post_url: string;
}

export interface ICategory {
  category_name: string;
}

export interface ITag {
  tag_name: string;
}

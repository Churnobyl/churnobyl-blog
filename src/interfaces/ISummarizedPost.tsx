export interface ISummarizedPost {
  id: string;
  title: string;
  categories: ICategory[];
  created_date: string;
  updated_date: string;
  description: string;
  tags: ITag[];
  post_url: string;
}

export interface ICategory {
  id: string;
  category_name: string;
}

export interface ITag {
  tag_name: string;
  id: string;
}

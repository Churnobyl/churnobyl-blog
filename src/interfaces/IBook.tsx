export interface IBookCategory {
  category: string;
  books: IBook[];
}

export interface IBook {
  book_name: string;
  url: string;
  created_date: string;
  updated_date: string;
}

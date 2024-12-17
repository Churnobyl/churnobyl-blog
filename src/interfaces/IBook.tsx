export interface IBooks {
  id: string;
  category_name: string;
  childrenNBook: {
    book_name: string;
    url: string;
    create_date: string;
    update_date: string;
    id: string;
  }[];
}

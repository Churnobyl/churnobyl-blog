import React from "react";
import { ICategory, ISummarizedPost } from "../../interfaces/ISummarizedPost";
import { Link } from "gatsby";

interface CategoryProps {
  category_list: ICategory[];
}

const Category: React.FC<CategoryProps> = ({ category_list }) => {
  return (
    <>
      {category_list?.map((category, index) => (
        <span
          key={category.id}
          className={"text-sm md:text-base font-light text-gray"}
        >
          <Link
            to={`/${category.url}`}
            title={`Explore posts in ${category.category_name}`}
          >
            {category.category_name}
          </Link>
          {index < category_list.length - 1 && " - "}
        </span>
      ))}
    </>
  );
};

export default Category;

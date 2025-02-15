import { Link } from "gatsby";
import React from "react";
import { ICategory } from "../../interfaces/ISummarizedPost";

interface CategoryProps {
  category_list: ICategory[];
}

const Category: React.FC<CategoryProps> = ({ category_list }) => {
  return (
    <div>
      {category_list?.map((category, index) => (
        <span
          key={category.id}
          className={
            "text-sm lg:text-base font-bold text-gray-dark dark:text-white-dark break-all antialiased"
          }
        >
          <Link
            to={`/${category.url}`}
            title={`Explore posts in ${category.category_name}`}
            className={"hover:text-gray"}
          >
            {category.category_name}
          </Link>
          {index < category_list.length - 1 && " - "}
        </span>
      ))}
    </div>
  );
};

export default Category;

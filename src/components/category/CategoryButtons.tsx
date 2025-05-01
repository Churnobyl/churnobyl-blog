import React from "react";
import { Link } from "gatsby";

interface CategoryChild {
  category_name: string;
  id: string;
  url?: string;
  childrenChurnotion?: {
    id: string;
  }[];
}

export interface CategoryData {
  category_name: string;
  id: string;
  url: string;
  parent?: {
    id: string;
  } | null;
  childrenNCategory?: CategoryChild;
  postCount?: number;
  hasSubCategories?: boolean;
}

interface CategoryButtonsProps {
  categories: CategoryData[];
  className?: string;
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({
  categories,
  className = "",
}) => {
  // 글 개수가 0인 카테고리 필터링
  const filteredCategories = categories.filter(
    (category) => category.postCount && category.postCount > 0
  );

  if (!filteredCategories || filteredCategories.length === 0) {
    return null;
  }

  return (
    <div
      className={`flex flex-wrap gap-2.5 md:gap-3 my-4 ${className}`}
      style={{ rowGap: "0.75rem" }}
    >
      {filteredCategories.map((category: CategoryData) => (
        <Link
          key={category.id}
          to={`/${category.url}`}
          className="group flex items-center rounded-full px-4 py-1.5 md:py-2 transition-all duration-300 
                    bg-gray-100 hover:bg-white hover:ring-2 hover:ring-gray-200 hover:shadow-md text-gray-800 
                    dark:bg-gray-700 dark:text-white-dark 
                    dark:hover:bg-main-blue dark:hover:ring-blue-500"
        >
          <span className="font-medium text-sm">{category.category_name}</span>
          {category.postCount && category.postCount > 0 && (
            <span className="ml-2 flex items-center justify-center w-5 h-5 text-xs font-semibold bg-main-blue dark:bg-sub-skyblue text-white rounded-full">
              {category.postCount}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
};

export default CategoryButtons;

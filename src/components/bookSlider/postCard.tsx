import React from "react";
import { IChildChurnotion } from "../../interfaces/IBook";
import { GatsbyImage } from "gatsby-plugin-image";
import classNames from "classnames";
import { Link } from "gatsby";

const PostCard = ({
  churnotion,
  isCurrent,
}: {
  churnotion: IChildChurnotion;
  isCurrent: boolean;
}) => {
  const { book_index, description, thumbnail, title, url } = churnotion;

  return (
    <Link
      to={"/" + url}
      className="hover:scale-105 transition-transform duration-300 flex justify-center items-center"
    >
      <div
        className={classNames(
          "relative flex flex-col w-36 h-48 xl:w-48 xl:h-64 flex-shrink-0 p-3 shadow-md bg-gray-light",
          {
            " text-white": isCurrent,
          }
        )}
      >
        <div
          className={classNames(
            "absolute top-2 left-2 z-10 bg-gray-light text-main-text-black text-xs px-2 py-1 rounded"
          )}
        >
          <span>{`Chaper ${book_index}`}</span>
        </div>

        {isCurrent && (
          <div
            className={classNames(
              "absolute top-0 right-0 z-10 bg-gradient-to-br from-highlight-yellow to-highlight-red text-white font-bold text-xs px-2 py-1 animate-pulse"
            )}
          >
            <span>Now</span>
          </div>
        )}

        <div className="w-full h-56 overflow-hidden rounded-lg bg-gray-light">
          <GatsbyImage
            image={thumbnail.childImageSharp.gatsbyImageData}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-between mt-3 h-full">
          <div
            className={classNames(
              "font-bold text-xs xl:text-sm text-main-text-black line-clamp-2",
              {
                "text-gray-light": isCurrent,
              }
            )}
          >
            {title}
          </div>
          <div
            className={classNames(
              "hidden xl:block text-xs text-gray mt-2 line-clamp-3",
              {
                "text-gray-light": isCurrent,
              }
            )}
          >
            {description}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;

import classNames from "classnames";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React, { useState, useEffect } from "react";
import ModeChange from "./modeChange";

const TopBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={classNames(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white dark:bg-main-text-black",
        {
          "bg-opacity-60 backdrop-blur-md shadow-md": isScrolled,
          "bg-opacity-100": !isScrolled,
        }
      )}
    >
      <div
        className={classNames(
          "flex w-full h-16 justify-between items-center px-4 md:px-8 transition-all duration-300",
          { "py-2": isScrolled, "py-4": !isScrolled }
        )}
      >
        <div id={"logo"}>
          <Link to={"/"}>
            {/* 기본 로고 */}
            <StaticImage
              src="../../images/title-logo.svg"
              alt="title"
              loading={"eager"}
              placeholder={"blurred"}
              className="block dark:hidden"
            />
            {/* 다크 모드 로고 */}
            <StaticImage
              src="../../images/title-logo-dark.svg"
              alt="title dark mode"
              loading={"eager"}
              placeholder={"blurred"}
              className="hidden dark:block"
            />
          </Link>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 focus:outline-none text-main-text-black dark:text-white-dark"
            aria-label="Toggle Menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex">
          <ul className="flex flex-row space-x-6">
            <li>
              <ModeChange />
            </li>
            <li>
              <Link
                to="/about"
                className="text-lg font-bold text-black hover:text-main-blue dark:text-white-dark"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/blog/book"
                className="text-lg font-bold text-black hover:text-main-blue dark:text-white-dark"
              >
                Book
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/Churnobyl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-bold text-black hover:text-main-blue dark:text-white-dark"
              >
                Github
              </a>
            </li>
            <li>
              <Link
                to="/story"
                className="text-lg font-bold text-black hover:text-main-blue dark:text-white-dark"
              >
                개발기
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={classNames(
          "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
          { "h-0": !isMenuOpen, "h-auto bg-gray-100 shadow-md": isMenuOpen }
        )}
      >
        <nav>
          <ul className="flex flex-col space-y-2 p-4">
            <li>
              <Link
                to="/about"
                className="text-sm text-black hover:text-main-blue dark:text-white-dark"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/site-tree"
                className="text-sm text-black hover:text-main-blue dark:text-white-dark"
              >
                SiteTree
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/Churnobyl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-black hover:text-main-blue dark:text-white-dark"
              >
                Github
              </a>
            </li>
            <li>
              <Link
                to="/story"
                className="text-sm text-black hover:text-main-blue dark:text-white-dark"
              >
                개발기
              </Link>
            </li>
            <li>
              <ModeChange />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default TopBar;

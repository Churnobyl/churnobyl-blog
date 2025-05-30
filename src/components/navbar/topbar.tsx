import classNames from "classnames";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React, { useEffect, useRef, useState } from "react";
import ExternalLinkSvg from "../../images/externalLinkSvg";
import GithubSvg from "../../images/githubSvg";
import ModeChange from "./modeChange";

const TopBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [paddingTop, setPaddingTop] = useState(64); // 초기 padding-top 값 (h-16 기준)
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Algolia 및 Netlify 스크립트 추가
  useEffect(() => {
    const initializeSearch = (selector: string) => {
      const algoliaCSS = document.createElement("link");
      algoliaCSS.rel = "stylesheet";
      algoliaCSS.href =
        "https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@1/dist/algoliasearchNetlify.css";
      document.head.appendChild(algoliaCSS);

      const algoliaScript = document.createElement("script");
      algoliaScript.src =
        "https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@1/dist/algoliasearchNetlify.js";
      algoliaScript.async = true;

      algoliaScript.onload = () => {
        if (typeof window.algoliasearchNetlify === "function") {
          window.algoliasearchNetlify({
            appId: "8UJFG7KP7L",
            apiKey: "6d5f9fd93f6c20ccbec8e9e3e4d3d36b",
            siteId: "ef684d8c-ed03-44fc-a7dc-f4211a8c35c1",
            branch: "main",
            selector: selector, // 동적으로 전달받은 selector
          });
        }
      };

      document.body.appendChild(algoliaScript);

      return () => {
        document.head.removeChild(algoliaCSS);
        document.body.removeChild(algoliaScript);
      };
    };

    // 검색 창 초기화 (header와 dropdown 각각의 검색 창에 대해)
    initializeSearch(".search-header");
    initializeSearch(".search-dropdown");
  }, []);

  // 메뉴 닫기 로직 (화면 크기 변경 시)
  useEffect(() => {
    const handleResize = () => {
      // 화면 너비가 lg 이상일 경우 드롭다운 메뉴 닫기
      if (window.innerWidth >= 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      setPaddingTop(288);
    } else {
      setPaddingTop(64);
    }
  }, [isMenuOpen]);

  return (
    <>
      {/* TopBar */}
      <header
        className={classNames(
          "fixed top-0 left-0 w-full z-50 transition-all ease-in-out duration-500 backdrop-blur-md bg-white/60 dark:bg-main-text-black/60 dark:backdrop-blur-md"
        )}
      >
        <div
          className={classNames(
            "flex w-full h-16 justify-between items-center px-4 md:px-8",
            { "py-2": isScrolled, "py-4": !isScrolled },
            {
              "shadow-md": isScrolled && !isMenuOpen,
              "bg-opacity-100 dark:bg-opacity-100": !isMenuOpen && !isScrolled,
            }
          )}
        >
          <div id={"logo"} className={"w-[200px] lg:w-auto"}>
            <Link to={"/"}>
              {/* 기본 로고 */}
              <StaticImage
                src="../../images/title-logo.png"
                alt="title"
                loading={"eager"}
                placeholder={"blurred"}
                className="block dark:hidden"
              />
              {/* 다크 모드 로고 */}
              <StaticImage
                src="../../images/title-logo-dark.png"
                alt="title dark mode"
                loading={"eager"}
                placeholder={"blurred"}
                className="hidden dark:block"
              />
            </Link>
          </div>

          <div className="lg:hidden" ref={menuRef}>
            <button
              ref={buttonRef}
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="p-2 focus:outline-none text-main-text-black dark:text-white-dark"
              aria-label="Toggle Menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  height="32px"
                  width="32px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34z"></path>
                </svg>
              ) : (
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  height={"32px"}
                  width={"32px"}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex space-x-4">
            <div className={"flex p-2"}>
              <ModeChange />
            </div>
            <div className={"flex justify-center items-center w-44"}>
              <div className="search-header" />
            </div>
            <ul className="flex flex-row items-center space-x-6">
              <li>
                <Link
                  to="/about"
                  className="text-lg font-bold text-black hover:text-main-blue dark:text-white-dark dark:hover:text-sub-skyblue"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/blog/book"
                  className="text-lg font-bold text-black hover:text-main-blue dark:text-white-dark dark:hover:text-sub-skyblue"
                >
                  Book
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/Churnobyl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-bold text-black hover:text-main-blue dark:text-white-dark dark:hover:text-sub-skyblue"
                >
                  <div className={"flex flex-row space-x-2 items-center"}>
                    <div>Github</div>
                    <GithubSvg />
                    <div className={"opacity-50"}>
                      <ExternalLinkSvg />
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <Link
                  to="/blog/post/developing-a-personal-blog-with-gatsby/"
                  className="text-lg font-bold text-black hover:text-main-blue dark:text-white-dark dark:hover:text-sub-skyblue"
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
            "top-16 left-0 w-full transition-[max-height] duration-500 ease-in-out overflow-hidden z-40",
            {
              "max-h-0": !isMenuOpen,
              "max-h-96 shadow-md": isMenuOpen,
            }
          )}
          aria-expanded={isMenuOpen}
          aria-hidden={!isMenuOpen}
        >
          <ul className="flex flex-col space-y-4 p-4" tabIndex={-1}>
            <li>
              <Link
                to="/about"
                className="text-lg text-black hover:text-main-blue dark:text-white-dark"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/blog/book"
                className="text-lg text-black hover:text-main-blue dark:text-white-dark"
              >
                Book
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/Churnobyl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-black hover:text-main-blue dark:text-white-dark"
              >
                <div className={"flex flex-row space-x-2 items-center"}>
                  <div>Github</div>
                  <GithubSvg />
                  <div className={"opacity-50"}>
                    <ExternalLinkSvg />
                  </div>
                </div>
              </a>
            </li>
            <li>
              <Link
                to="/blog/post/개발기/developing-a-personal-blog-with-gatsby/"
                className="text-lg text-black hover:text-main-blue dark:text-white-dark"
              >
                개발기
              </Link>
            </li>
            <li className={"flex flex-row"}>
              <ModeChange onClick={() => setIsMenuOpen(false)} />
            </li>
          </ul>
        </div>
      </header>

      {/* Padding to avoid content being hidden behind the TopBar */}
      <div
        style={{
          paddingTop: `${paddingTop}px`,
        }}
        className="transition-[padding-top] duration-500 ease-in-out"
      ></div>
    </>
  );
};

export default TopBar;

import React from "react";

const Footer = () => {
  return (
    <div
      className={
        "p-5 flex justify-center items-center flex-col bg-gray-light dark:bg-main-text-black h-16 mt-2 w-full"
      }
    >
      <div
        className={
          "flex flex-col xl:flex-row items-center justify-between w-4/5 text-main-text-black dark:text-white-dark text-xs sm:text-sm max-w-[1080px]"
        }
      >
        <div>
          <span>© Churnobyl 성철민</span>
        </div>
        <div>
          <span>Contact: tjdcjfals@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;

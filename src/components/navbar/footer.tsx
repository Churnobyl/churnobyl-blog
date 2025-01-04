import React from "react";

const Footer = () => {
  return (
    <div
      className={
        "p-5 flex justify-center items-center flex-col bg-gray-light h-16 mt-10 w-full"
      }
    >
      <div
        className={
          "flex flex-col xl:flex-row items-center justify-between w-3/5 text-main-text-black text-xs sm:text-sm max-w-[760px]"
        }
      >
        <div>
          <span>© Churnobyl 성철민</span>
        </div>
        <div>
          <span>Contact: tjdcjfals3@naver.com</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;

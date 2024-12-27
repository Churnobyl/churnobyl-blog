import React from "react";

const Footer = () => {
  return (
    <div className={"p-5 flex items-center flex-col bg-gray-light h-16"}>
      <div
        className={
          "flex items-center justify-between w-3/5 text-main-text-black text-sm"
        }
      >
        <span>© Churnobyl 성철민</span>
        <span>Contact: tjdcjfals3@naver.com</span>
      </div>
    </div>
  );
};

export default Footer;

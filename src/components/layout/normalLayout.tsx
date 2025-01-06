import classNames from "classnames";
import React from "react";
import Footer from "../navbar/footer";
import TopBar from "../navbar/topbar";

interface NormalLayoutProps {
  children: React.ReactNode;
}

const NormalLayout: React.FC<NormalLayoutProps> = ({ children }) => {
  return (
    <>
      <TopBar />
      <main
        className={classNames(
          "flex flex-col justify-center items-center xl:mt-8 w-full p-4"
        )}
      >
        {children}
      </main>
      <Footer />
    </>
  );
};

export default NormalLayout;

import classNames from "classnames";
import React from "react";
import Footer from "../navbar/footer";
import TopBar from "../navbar/topbar";
import { SEO } from "../seo/seo";

interface NormalLayoutProps {
  children: React.ReactNode;
}

const NormalLayout: React.FC<NormalLayoutProps> = ({ children }) => {
  return (
    <>
      <TopBar />
      <main
        className={classNames("flex justify-center items-center mt-16 w-full")}
      >
        {children}
      </main>
      <Footer />
    </>
  );
};

export default NormalLayout;

export const Head = () => <SEO />;

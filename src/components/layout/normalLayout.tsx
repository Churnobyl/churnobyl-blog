import classNames from "classnames";
import React, { useEffect, useState } from "react";
import Footer from "../navbar/footer";
import TopBar from "../navbar/topbar";
import { ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "../../theme/theme";

interface NormalLayoutProps {
  children: React.ReactNode;
}

const NormalLayout: React.FC<NormalLayoutProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const observer = new MutationObserver(() => {
        setIsDarkMode(document.documentElement.classList.contains("dark"));
      });

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });

      return () => observer.disconnect();
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <TopBar />
        <main
          className={classNames(
            "flex flex-col justify-center items-center w-full p-4"
          )}
        >
          {children}
        </main>
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default NormalLayout;

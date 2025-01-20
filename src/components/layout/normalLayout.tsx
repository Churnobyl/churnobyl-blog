import ThemeProvider from "@mui/material/styles/ThemeProvider";
import classNames from "classnames";
import React, { useLayoutEffect, useState } from "react";
import { darkTheme, lightTheme } from "../../theme/theme";
import Footer from "../navbar/footer";
import TopBar from "../navbar/topbar";

interface NormalLayoutProps {
  children: React.ReactNode;
}

const NormalLayout: React.FC<NormalLayoutProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const theme = isDarkMode ? darkTheme : lightTheme;

  useLayoutEffect(() => {
    const updateDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    const observer = new MutationObserver(updateDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Initial check
    updateDarkMode();

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
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

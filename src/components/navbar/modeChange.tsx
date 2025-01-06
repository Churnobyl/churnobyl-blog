import React, { useLayoutEffect } from "react";
import { LOCAL_STORAGE_KEY, THEME } from "../../constants";
import ModeToggleButton from "./modeToggleButton";

const ModeChange = () => {
  const toggleTheme = () => {
    const htmlEl = document.querySelector("html");
    if (!htmlEl) return;

    const enabledDarkMode = htmlEl.classList.contains("dark");
    if (enabledDarkMode) {
      htmlEl.classList.remove("dark");
      localStorage.removeItem(LOCAL_STORAGE_KEY.THEME);
    } else {
      htmlEl.classList.add("dark");
      localStorage.setItem(LOCAL_STORAGE_KEY.THEME, THEME.DARK);
    }
  };

  useLayoutEffect(() => {
    const theme = localStorage.getItem(LOCAL_STORAGE_KEY.THEME);
    if (theme === THEME.DARK) {
      document.querySelector("html")?.classList.add(THEME.DARK);
    }
  });

  return <ModeToggleButton onClick={toggleTheme} />;
};

export default ModeChange;

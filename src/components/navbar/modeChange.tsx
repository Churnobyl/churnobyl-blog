import React, { useLayoutEffect } from "react";
import { LOCAL_STORAGE_KEY, THEME } from "../../constants";
import ModeToggleButton from "./modeToggleButton";

interface ModeChangeProps {
  onClick?: () => void; // 부모로부터 전달받은 onClick 핸들러
}

const ModeChange: React.FC<ModeChangeProps> = ({ onClick }) => {
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

    // 부모로부터 전달받은 onClick 핸들러 실행
    if (onClick) {
      onClick();
    }
  };

  useLayoutEffect(() => {
    const theme = localStorage.getItem(LOCAL_STORAGE_KEY.THEME);
    if (theme === THEME.DARK) {
      document.querySelector("html")?.classList.add(THEME.DARK);
    }
  }, []);

  return (
    <div>
      <ModeToggleButton onClick={toggleTheme} />
    </div>
  );
};

export default ModeChange;

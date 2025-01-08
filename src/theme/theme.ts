import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light", // 라이트 모드
    primary: {
      main: "#1a73e8",
    },
    secondary: {
      main: "#fbbc04",
    },
    text: {
      primary: "#000000",
      secondary: "#ffffff",
    },
  },
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: "#24292e",
          "&.Mui-selected": {
            backgroundColor: "#393939",
            color: "#FCFCFC",
          },
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark", // 다크 모드
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    text: {
      primary: "#ffffff",
      secondary: "#bbbbbb",
    },
    background: {
      default: "#121212",
      paper: "#1d1d1d",
    },
  },
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: "#FCFCFC",
          "&.Mui-selected": {
            backgroundColor: "#08C2FF",
            color: "#24292e",
          },
        },
      },
    },
  },
});

export { lightTheme, darkTheme };

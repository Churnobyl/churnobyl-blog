import * as React from "react";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";

export function onRenderBody({ setPreBodyComponents }) {
  setPreBodyComponents([<InitColorSchemeScript attribute="class" />]);
}

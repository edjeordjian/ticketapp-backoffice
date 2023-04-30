import { Button } from "@mui/material";
import * as React from "react";
import { basicButtonStyle } from "../styles/events/BasicButtonStyle";

export default function BasicBtn(props) {
  return (
    <Button
      type={props.type || "button"}
      variant="contained"
      onClick={props.onClick}
      style={basicButtonStyle.btnStyle}
      disabled={props.disabled}
    >
      {props.label}
    </Button>
  );
}

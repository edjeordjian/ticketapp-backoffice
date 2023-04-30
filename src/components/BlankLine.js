import React from "react";

import { InputLabel } from "@mui/material";

const BlankLine = (props) => {
  const auxArray = Array.from(
    {
      length: props.number ? props.number : 1,
    },
    (_, idx) => idx
  );

  return (
    <div>
      {auxArray.map((idx) => (
        <InputLabel key={idx} index={idx}>
          &nbsp;
        </InputLabel>
      ))}
    </div>
  );
};

export { BlankLine };

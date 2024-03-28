import React from "react";

import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

const Textfield = ({ Icon, onValueChange, ...rest }) => {
  return (
    <TextField
      size="small"
      variant="outlined"
      {...rest}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{Icon}</InputAdornment>
        ),
      }}
      onChange={(e) => onValueChange(e.target.value)}
    />
  );
};

export default Textfield;

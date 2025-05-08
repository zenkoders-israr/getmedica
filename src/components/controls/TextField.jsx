// ReusableTextField.js
import React from "react";
import PropTypes from "prop-types";
import { TextField, InputAdornment } from "@mui/material";

const ReusableTextField = ({
  sx = {},
  type = "text",
  onChange = () => {},
  value = null,
  icon = null,
  name = "",
  iconPosition = "start",
  label = "Label",
  placeholder = null,
  fullWidth = true,
  disabled = false,
  error = false,
  helperText = "",
}) => {
  const adornment = icon && (
    <InputAdornment position={iconPosition}>{icon}</InputAdornment>
  );

  return (
    <TextField
      sx={sx}
      type={type}
      onChange={onChange}
      value={value}
      label={label}
      name={name}
      placeholder={placeholder}
      fullWidth={fullWidth}
      disabled={disabled}
      error={error}
      helperText={helperText}
      InputProps={{
        [iconPosition === "start" ? "startAdornment" : "endAdornment"]:
          adornment,
      }}
    />
  );
};

ReusableTextField.propTypes = {
  sx: PropTypes.object,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(["start", "end"]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default ReusableTextField;

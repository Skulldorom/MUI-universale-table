import React, { useState, useCallback } from "react";
import { TextField, InputAdornment, Box } from "@mui/material";
import { Search } from "@mui/icons-material";
import PropTypes from "prop-types";

const FancySearch = ({ value, onSubmit, placeholder = "Search..." }) => {
  const [searchValue, setSearchValue] = useState(value || "");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (onSubmit) {
        onSubmit(searchValue);
      }
    },
    [searchValue, onSubmit]
  );

  const handleChange = useCallback(
    (event) => {
      const newValue = event.target.value;
      setSearchValue(newValue);
      if (onSubmit) {
        onSubmit(newValue);
      }
    },
    [onSubmit]
  );

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  React.useEffect(() => {
    setSearchValue(value || "");
  }, [value]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        position: "relative",
        display: "inline-block",
      }}
    >
      <TextField
        value={searchValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        variant="outlined"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: "#9aa0a6" }} />
            </InputAdornment>
          ),
          sx: {
            borderRadius: "24px",
            backgroundColor: "#fff",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            },
            "&.Mui-focused": {
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#dadce0",
              borderWidth: "1px",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#dadce0",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#4285f4",
              borderWidth: "1px",
            },
            "& input": {
              padding: "8px 12px 8px 0",
              fontSize: "16px",
              color: "#202124",
              "&::placeholder": {
                color: "#9aa0a6",
                opacity: 1,
              },
            },
          },
        }}
        sx={{
          minWidth: 200,
          "& .MuiInputBase-root": {
            boxShadow: isFocused
              ? "0 2px 8px rgba(0,0,0,0.15)"
              : "0 1px 6px rgba(32,33,36,.28)",
            "&:hover": {
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            },
          },
        }}
      />
    </Box>
  );
};

FancySearch.propTypes = {
  value: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default FancySearch;

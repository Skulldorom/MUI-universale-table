import React, { useState, useCallback } from "react";
import { TextField, InputAdornment, Box } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";

const FancySearch = ({ value, onSubmit, placeholder = "Search..." }) => {
  const theme = useTheme();
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
              <Search sx={{ color: theme.palette.text.secondary }} />
            </InputAdornment>
          ),
          sx: {
            borderRadius: theme.shape.borderRadius * 6, // 24px equivalent
            backgroundColor: theme.palette.background.paper,
            transition: theme.transitions.create("box-shadow", {
              duration: theme.transitions.duration.short,
            }),
            "&:hover": {
              boxShadow: theme.shadows[2],
            },
            "&.Mui-focused": {
              boxShadow: theme.shadows[3],
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.divider,
              borderWidth: "1px",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.divider,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
              borderWidth: "1px",
            },
            "& input": {
              padding: "8px 12px 8px 0",
              fontSize: "16px",
              color: theme.palette.text.primary,
              "&::placeholder": {
                color: theme.palette.text.secondary,
                opacity: 1,
              },
            },
          },
        }}
        sx={{
          minWidth: 200,
          "& .MuiInputBase-root": {
            boxShadow: isFocused ? theme.shadows[3] : theme.shadows[1],
            "&:hover": {
              boxShadow: theme.shadows[2],
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

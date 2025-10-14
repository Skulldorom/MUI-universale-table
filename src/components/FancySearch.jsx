import React, { useState, useCallback } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import PropTypes from "prop-types";

const FancySearch = ({ value, onSubmit, placeholder = "Search..." }) => {
  const [searchValue, setSearchValue] = useState(value || "");

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

  React.useEffect(() => {
    setSearchValue(value || "");
  }, [value]);

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        value={searchValue}
        onChange={handleChange}
        placeholder={placeholder}
        variant="outlined"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        sx={{ minWidth: 200 }}
      />
    </form>
  );
};

FancySearch.propTypes = {
  value: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default FancySearch;

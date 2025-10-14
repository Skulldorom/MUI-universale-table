import React from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import PropTypes from "prop-types";

const LazyLoadingIndicator = ({ show, currentPage, totalPages }) => {
  if (!show) return null;

  return (
    <Box sx={{ width: "100%", mb: 2 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Loading page {currentPage} of {totalPages}...
      </Typography>
      <LinearProgress />
    </Box>
  );
};

LazyLoadingIndicator.propTypes = {
  show: PropTypes.bool.isRequired,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
};

export default LazyLoadingIndicator;

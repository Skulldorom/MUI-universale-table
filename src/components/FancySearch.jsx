import React from "react";
import {
  Collapse,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Stack,
} from "@mui/material";
import { Clear, Search } from "@mui/icons-material";
import PropTypes from "prop-types";

export default function FancySearch({ value, onSubmit }) {
  const [search, setSearch] = React.useState(value);
  const [hover, setHover] = React.useState(Boolean(search));
  const expanded = hover || Boolean(search);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from actually submitting

    onSubmit(search);
  };

  const handleEndHover = () => {
    setHover(false);
  };

  React.useEffect(() => {
    // if the value hasnt changed after a short internal call the function
    const timer = setTimeout(() => {
      onSubmit(search);
    }, 700);
    return () => clearTimeout(timer);
  }, [search, value, onSubmit]);

  return (
    <form onSubmit={handleSubmit}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: expanded ? "24px" : "50px", // changes when hover starts or ends
          display: "flex",
          alignItems: "center",
          transition: "all 0.5s ease-in-out", // smooth transition in both directions
          p: expanded ? 1 : 0.5, // smooth padding transition
          width: "fit-content", // fit content to children
          border: (theme) => `1px solid ${theme.palette.divider}`,
          mb: 1,
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={handleEndHover}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
      >
        <InputBase
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            ml: 1,
            width: expanded ? "100%" : 0, // animate width in both hover states
            transition: "width 0.5s ease-in-out", // smooth width change
            ...(expanded ? {} : { margin: 0 }), // remove margin when not hovering
          }}
          onBlur={handleEndHover}
        />

        <Collapse
          in={search ? true : false}
          orientation="horizontal"
          unmountOnExit
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={0}
            sx={{
              mr: 3,
            }}
          >
            <IconButton onClick={() => setSearch("")}>
              <Clear />
            </IconButton>
            <Divider orientation="vertical" flexItem />
          </Stack>
        </Collapse>

        <IconButton onClick={handleSubmit} type="submit">
          <Search />
        </IconButton>
      </Paper>
    </form>
  );
}

FancySearch.propTypes = {
  value: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

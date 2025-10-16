import React from "react";
import {
  TableBody,
  TableCell,
  TableRow,
  Skeleton,
  TableHead,
} from "@mui/material";

const TableLoader = () => {
  return (
    <>
      <TableHead />
      <TableBody>
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index}>
            {Array.from({ length: 4 }).map((_, cellIndex) => (
              <TableCell key={cellIndex}>
                <Skeleton height={30} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default TableLoader;

import React from "react";
import { TableBody, TableCell, TableRow, Skeleton } from "@mui/material";

const TableLoader = () => {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index}>
          {Array.from({ length: 4 }).map((_, cellIndex) => (
            <TableCell key={cellIndex}>
              <Skeleton variant="text" width="100%" height={20} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableLoader;

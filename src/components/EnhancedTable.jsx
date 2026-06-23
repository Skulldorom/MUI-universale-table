import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material";
import useEnhancedTableState from "../hooks/useEnhancedTableState";
import {
  getComparator,
  getPageOptions,
  getSelectableRowId,
  stableSort,
} from "../utils/tableUtils";
import EnhancedTableHead from "./EnhancedTableHead";
import DataRow from "./DataRow";
import TableLoader from "./TableLoader";

function EnhancedTable(props) {
  const {
    headers,
    rows,
    subTable,
    selected,
    selectID,
    serverSide,
    totalCount,
    onSortChange,
  } = props;
  const dense = true;
  const {
    order,
    orderBy,
    page,
    rowsPerPage,
    handleRequestSort,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useEnhancedTableState({
    rows,
    subTable,
    resetFlag: props.resetFlag,
    serverSide,
    order: props.order,
    orderBy: props.orderBy,
    page: props.page,
    rowsPerPage: props.rowsPerPage,
    onSortChange,
    onPageChange: props.onPageChange,
    onRowsPerPageChange: props.onRowsPerPageChange,
  });

  const isSelected = React.useCallback(
    (id) => selected.includes(id),
    [selected],
  );

  /**
   * Server-side: rows are already the current page — no sort, no slice.
   * Client-side: sort the full dataset, then slice to the current page.
   */
  const visibleRows = React.useMemo(
    () =>
      serverSide
        ? rows
        : stableSort(rows, getComparator(order, orderBy), headers).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage,
          ),
    // serverSide only depends on rows; client-side depends on sort/pagination too
    serverSide
      ? [rows]
      : [headers, order, orderBy, page, rows, rowsPerPage],
  );

  /** Placeholder rows to keep the table body height stable on the last page. */
  const emptyRows = serverSide
    ? Math.max(
        0,
        (rowsPerPage ?? (subTable ? rows.length : 5)) - visibleRows.length,
      )
    : Math.max(
        0,
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage),
      );

  /** Total row count for pagination display. */
  const displayCount =
    serverSide && totalCount != null ? totalCount : rows.length;

  return (
    <TableContainer>
      <Table
        sx={{ minWidth: 750 }}
        size={dense ? "small" : "medium"}
        aria-label={props.name || "data table"}
      >
        {props.loading ? (
          <TableLoader />
        ) : (
          <>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              onSortChange={serverSide ? onSortChange : undefined}
              headings={headers}
              selectRows={props.selectRows}
              numSelected={selected.length}
              rowCount={rows.length}
              onSelectAllClick={props.handleSelectAllClick}
            />

            <TableBody>
              {visibleRows.map((row, index) => {
                const rowKey = selectID
                  ? row[selectID]
                  : `row-${page * rowsPerPage + index}`;
                const rowID = getSelectableRowId(row, index, selectID);

                return (
                  <DataRow
                    key={rowKey}
                    rowID={rowID}
                    headers={headers}
                    rowValues={row}
                    hideBadge={props.hideBadge}
                    selectRows={props.selectRows}
                    handleClick={props.handleClick}
                    isSelected={isSelected}
                  />
                );
              })}
              {!subTable && emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={headers.length} />
                </TableRow>
              )}
            </TableBody>
          </>
        )}
      </Table>
      {subTable ? (
        <Box sx={{ mb: 3 }} />
      ) : (
        <TablePagination
          rowsPerPageOptions={
            props.pageSizeOptions || getPageOptions(displayCount)
          }
          component="div"
          count={displayCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ overflow: "visible" }}
          showFirstButton
          showLastButton
        />
      )}
    </TableContainer>
  );
}

EnhancedTable.propTypes = {
  headers: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  subTable: PropTypes.bool,
  hideBadge: PropTypes.bool,
  loading: PropTypes.bool,
  selectRows: PropTypes.bool,
  handleSelectAllClick: PropTypes.func,
  handleClick: PropTypes.func,
  selected: PropTypes.array,
  selectID: PropTypes.string,
  resetFlag: PropTypes.string,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  name: PropTypes.string,

  // --- Server-side mode props ---
  /** Enable server-side data flow (externally-controlled pagination, sort, search). */
  serverSide: PropTypes.bool,
  /** Total row count for pagination (required when serverSide). */
  totalCount: PropTypes.number,
  /** Controlled current page (required when serverSide). */
  page: PropTypes.number,
  /** Callback (page: number) => void (required when serverSide). */
  onPageChange: PropTypes.func,
  /** Controlled rows per page (required when serverSide). */
  rowsPerPage: PropTypes.number,
  /** Callback (rowsPerPage: number) => void (required when serverSide). */
  onRowsPerPageChange: PropTypes.func,
  /** Controlled sort order. */
  order: PropTypes.oneOf(["asc", "desc"]),
  /** Controlled sort column. */
  orderBy: PropTypes.string,
  /** Callback ({ order, orderBy }) => void. */
  onSortChange: PropTypes.func,
};

export default EnhancedTable;

import React from "react";

/**
 * Unified state hook that supports both client-side and server-side modes.
 *
 * Client-side (serverSide=false, default):
 *   Manages order, orderBy, page, and rowsPerPage internally.
 *   resetFlag resets the page to 0 when it changes (e.g. after search).
 *
 * Server-side (serverSide=true):
 *   Returns controlled props directly — no internal state.
 *   Handler callbacks fire the provided on*Change props instead of
 *   calling setState. The caller owns the data fetching lifecycle.
 */
export default function useEnhancedTableState({
  rows,
  subTable,
  resetFlag,
  serverSide,
  order: controlledOrder,
  orderBy: controlledOrderBy,
  page: controlledPage,
  rowsPerPage: controlledRowsPerPage,
  onSortChange,
  onPageChange,
  onRowsPerPageChange,
}) {
  // ---------- client-side state ----------
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [pagination, setPagination] = React.useState(() => ({
    page: 0,
    rowsPerPage: subTable ? rows.length : 5,
    resetFlag,
  }));

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPagination((previous) => {
      if (previous.resetFlag === resetFlag) {
        return previous;
      }

      return {
        ...previous,
        page: 0,
        resetFlag,
      };
    });
  }, [resetFlag]);

  // ---------- server-side passthrough ----------
  if (serverSide) {
    const handleRequestSort = React.useCallback(
      (event, property) => {
        const isAsc =
          controlledOrderBy === property && controlledOrder === "asc";
        const nextOrder = isAsc ? "desc" : "asc";
        if (onSortChange) {
          onSortChange({ order: nextOrder, orderBy: property });
        }
      },
      [controlledOrder, controlledOrderBy, onSortChange],
    );

    const handleChangePage = React.useCallback(
      (event, newPage) => {
        if (onPageChange) {
          onPageChange(newPage);
        }
      },
      [onPageChange],
    );

    const handleChangeRowsPerPage = React.useCallback(
      (event) => {
        if (onRowsPerPageChange) {
          onRowsPerPageChange(Number.parseInt(event.target.value, 10));
        }
      },
      [onRowsPerPageChange],
    );

    return {
      order: controlledOrder,
      orderBy: controlledOrderBy,
      page: controlledPage,
      rowsPerPage: controlledRowsPerPage,
      handleRequestSort,
      handleChangePage,
      handleChangeRowsPerPage,
    };
  }

  // ---------- client-side handlers ----------
  const page = pagination.page;
  const rowsPerPage = subTable ? rows.length : pagination.rowsPerPage;

  const handleRequestSort = React.useCallback(
    (event, property) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    },
    [order, orderBy],
  );

  const handleChangePage = React.useCallback((event, newPage) => {
    setPagination((previous) => ({
      ...previous,
      page: newPage,
    }));
  }, []);

  const handleChangeRowsPerPage = React.useCallback((event) => {
    setPagination((previous) => ({
      ...previous,
      page: 0,
      rowsPerPage: Number.parseInt(event.target.value, 10),
    }));
  }, []);

  return {
    order,
    orderBy,
    page,
    rowsPerPage,
    handleRequestSort,
    handleChangePage,
    handleChangeRowsPerPage,
  };
}

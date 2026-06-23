import React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import LazyLoadingIndicator from "./components/LazyLoadingIndicator";
import useSearchableRows from "./hooks/useSearchableRows";
import useSelectableRows from "./hooks/useSelectableRows";
import TableSelectionBanner from "./components/TableSelectionBanner";
import TableTitle from "./components/TableTitle";
import TableToolbarContent from "./components/TableToolbarContent";
import EnhancedTable from "./components/EnhancedTable";

export default function UniversalTable({
  loading,
  setLoading,
  onReload,
  lazyloading = false,
  currentPage,
  totalPages,
  data,
  headers,
  name,
  reloadBtnLoading,
  subTable = false,
  hideBadge = false,
  selectRows = false,
  selectID,
  selectIcon,
  onSelection,
  pageSizeOptions,
  persistSearch,
  // --- Server-side mode props ---
  serverSide = false,
  totalCount,
  page,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
  order,
  orderBy,
  onSortChange,
  onSearchChange,
}) {
  const head = headers || [];

  // Client-side search only applies when NOT in server-side mode
  const clientSearch = useSearchableRows(data, head);
  const rows = serverSide ? data : clientSearch.rows;
  const searchTerm = serverSide ? "" : clientSearch.searchTerm;

  const { selected, clearSelection, handleSelectAllClick, handleClick } =
    useSelectableRows({
      rows,
      selectRows,
      selectID,
    });

  const handleSearchChange = React.useCallback(
    (value) => {
      clearSelection();
      if (serverSide) {
        // Server-side: delegate search to the parent
        if (onSearchChange) {
          onSearchChange(value);
        }
      } else {
        // Client-side: filter in memory
        clientSearch.setSearchTerm(value);
      }
    },
    [clearSelection, serverSide, onSearchChange, clientSearch],
  );

  return (
    <>
      <LazyLoadingIndicator
        show={lazyloading}
        currentPage={currentPage}
        totalPages={totalPages}
      />
      <Paper
        sx={{
          ...(subTable && { boxShadow: "none" }),
        }}
      >
        <TableSelectionBanner
          selected={selected}
          onSelection={onSelection}
          selectIcon={selectIcon}
        />
        <TableTitle name={name} subTable={subTable} />
        {!subTable && (
          <TableToolbarContent
            setLoading={setLoading}
            onReload={onReload}
            reloadBtnLoading={reloadBtnLoading}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            name={name}
            persistSearch={persistSearch}
          />
        )}
        <EnhancedTable
          headers={head}
          rows={rows}
          resetFlag={serverSide ? undefined : searchTerm}
          subTable={subTable}
          hideBadge={hideBadge}
          loading={loading}
          selectRows={selectRows}
          handleSelectAllClick={handleSelectAllClick}
          handleClick={handleClick}
          selected={selected}
          selectID={selectID}
          pageSizeOptions={pageSizeOptions}
          name={name}
          // --- Server-side props ---
          serverSide={serverSide}
          totalCount={totalCount}
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          order={order}
          orderBy={orderBy}
          onSortChange={onSortChange}
        />
      </Paper>
    </>
  );
}

UniversalTable.propTypes = {
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
  /** Preferred callback — fires when the user clicks reload. */
  onReload: PropTypes.func,
  lazyloading: PropTypes.bool,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  data: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired,
  name: PropTypes.string,
  reloadBtnLoading: PropTypes.bool,
  subTable: PropTypes.bool,
  hideBadge: PropTypes.bool,
  selectRows: PropTypes.bool,
  selectID: PropTypes.string,
  selectIcon: PropTypes.element,
  onSelection: PropTypes.func,
  /** Override default page size options (e.g. [10, 25, 50]). Default auto-computed. */
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  /** Persist search term to sessionStorage (requires name prop). Default: false */
  persistSearch: PropTypes.bool,

  // --- Server-side mode ---
  /** Enable server-side data flow. When true, pagination, sort, and search are externally controlled. */
  serverSide: PropTypes.bool,
  /** Total row count for pagination math (required when serverSide). */
  totalCount: PropTypes.number,
  /** Controlled current page (required when serverSide). */
  page: PropTypes.number,
  /** Callback (page: number) => void (required when serverSide). */
  onPageChange: PropTypes.func,
  /** Controlled rows per page (required when serverSide). */
  rowsPerPage: PropTypes.number,
  /** Callback (rowsPerPage: number) => void (required when serverSide). */
  onRowsPerPageChange: PropTypes.func,
  /** Callback ({ order, orderBy }) => void. */
  onSortChange: PropTypes.func,
  /** Controlled sort order. */
  order: PropTypes.oneOf(["asc", "desc"]),
  /** Controlled sort column. */
  orderBy: PropTypes.string,
  /** Callback (term: string) => void. */
  onSearchChange: PropTypes.func,
};

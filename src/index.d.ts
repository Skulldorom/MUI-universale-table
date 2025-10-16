import { ReactElement } from "react";

export interface TableRowData {
  [key: string]: unknown;
}

export interface TableHeader {
  id: string;
  label: string;
  searchable?: boolean;
  numeric?: boolean;
  date?: boolean;
  // eslint-disable-next-line no-unused-vars
  component?: (rowData: TableRowData) => ReactElement;
  cellProps?: Record<string, unknown>;
  subRow?: boolean;
  iconColor?: string;
  openIcon?: ReactElement;
  closeIcon?: ReactElement;
  headers?: TableHeader[];
  loading?: boolean;
  // eslint-disable-next-line no-unused-vars
  setLoading?: (loading: boolean) => void;
  subTitle?: string;
}

export interface UniversalTableProps {
  /** Array of data objects to display */
  data: TableRowData[];
  /** Array of header configuration objects */
  headers: TableHeader[];
  /** Table title */
  name?: string;
  /** Shows loading state */
  loading?: boolean;
  /** Function to control loading state */
  // eslint-disable-next-line no-unused-vars
  setLoading?: (loading: boolean) => void;
  /** Enable lazy loading indicator */
  lazyloading?: boolean;
  /** Current page for lazy loading */
  currentPage?: number;
  /** Total pages for lazy loading */
  totalPages?: number;
  /** Loading state for reload button */
  reloadBtnLoading?: boolean;
  /** Whether this is a nested sub-table */
  subTable?: boolean;
  /** Hide badges on expandable rows */
  hideBadge?: boolean;
  /** Enable row selection */
  selectRows?: boolean;
  /** Property to use as unique identifier for selection */
  selectID?: string;
  /** Custom icon for selection action */
  selectIcon?: ReactElement;
  /** Callback when rows are selected */
  // eslint-disable-next-line no-unused-vars
  onSelection?: (selectedIds: unknown[]) => void;
}

declare const UniversalTable: React.FC<UniversalTableProps>;

export { UniversalTable };
export default UniversalTable;

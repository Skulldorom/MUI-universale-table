# MUI Universal Table

A comprehensive, feature-rich table component built with Material-UI for React applications.

## Features

- 🔍 **Built-in Search** - Filter data across searchable columns
- 📄 **Pagination** - Handle large datasets with customizable page sizes
- 🔄 **Sorting** - Sort by any column with visual indicators
- ✅ **Row Selection** - Single or multiple row selection with checkboxes
- 📊 **Sub-tables** - Expandable nested tables for hierarchical data
- 🎨 **Customizable** - Extensive styling and behavior customization
- ⚡ **Performance** - Optimized for large datasets with lazy loading support
- ☁️ **Server-Side Mode** - Externally-controlled pagination, sort, and search for massive datasets
- 🔄 **Refresh** - Built-in reload functionality
- 📱 **Responsive** - Mobile-friendly design

## Installation

```bash
npm install mui-universal-table
```

### Peer Dependencies

Make sure you have these peer dependencies installed:

```bash
npm install react react-dom @mui/material @emotion/react @emotion/styled @mui/icons-material prop-types
```

## Basic Usage

```jsx
import React from "react";
import { UniversalTable } from "mui-universal-table";

const headers = [
  { id: "name", label: "Name", searchable: true },
  { id: "email", label: "Email", searchable: true },
  { id: "age", label: "Age", numeric: true },
];

const data = [
  { name: "John Doe", email: "john@example.com", age: 30 },
  { name: "Jane Smith", email: "jane@example.com", age: 25 },
];

function MyTable() {
  const [loading, setLoading] = React.useState(false);

  return (
    <UniversalTable
      data={data}
      headers={headers}
      name="Users"
      loading={loading}
      setLoading={setLoading}
    />
  );
}
```

## Props

| Prop               | Type      | Default      | Description                                        |
| ------------------ | --------- | ------------ | -------------------------------------------------- |
| `data`             | `array`   | **required** | Array of data objects to display                   |
| `headers`          | `array`   | **required** | Array of header configuration objects              |
| `name`             | `string`  | -            | Table title                                        |
| `loading`          | `bool`    | `false`      | Shows loading state                                |
| `setLoading`       | `func`    | -            | Function to control loading state                  |
| `onReload`         | `func`    | -            | Preferred — fires when the user clicks reload      |
| `selectRows`       | `bool`    | `false`      | Enable row selection                               |
| `selectID`         | `string`  | -            | Property to use as unique identifier for selection |
| `onSelection`      | `func`    | -            | Callback when rows are selected                    |
| `subTable`         | `bool`    | `false`      | Whether this is a nested sub-table                 |
| `hideBadge`        | `bool`    | `false`      | Hide badges on expandable rows                     |
| `reloadBtnLoading` | `bool`    | `false`      | Loading state for reload button                    |
| `lazyloading`      | `bool`    | `false`      | Enable lazy loading indicator                      |
| `currentPage`      | `number`  | -            | Current page for lazy loading                      |
| `totalPages`       | `number`  | -            | Total pages for lazy loading                       |
| `selectIcon`       | `element` | -            | Custom icon for selection action                   |
| `pageSizeOptions`  | `array`   | -            | Override default page size options (e.g. `[10, 25, 50]`) |
| `persistSearch`    | `bool`    | `false`      | Persist search term to sessionStorage              |

### Server-Side Mode Props

| Prop                   | Type     | Default | Description                                              |
| ---------------------- | -------- | ------- | -------------------------------------------------------- |
| `serverSide`           | `bool`   | `false` | Enable server-side data flow                             |
| `totalCount`           | `number` | -       | Total row count for pagination math                      |
| `page`                 | `number` | -       | Controlled current page                                  |
| `onPageChange`         | `func`   | -       | Callback `(page: number) => void`                        |
| `rowsPerPage`          | `number` | -       | Controlled rows per page                                 |
| `onRowsPerPageChange`  | `func`   | -       | Callback `(rowsPerPage: number) => void`                 |
| `onSortChange`         | `func`   | -       | Callback `({ order, orderBy }) => void`                  |
| `onSearchChange`       | `func`   | -       | Callback `(term: string) => void`                        |

## Header Configuration

Each header object can have the following properties:

| Property     | Type      | Description                                              |
| ------------ | --------- | -------------------------------------------------------- |
| `id`         | `string`  | **Required** - Column identifier (matches data property) |
| `label`      | `string`  | **Required** - Display label for column                  |
| `searchable` | `bool`    | Whether this column is searchable                        |
| `numeric`    | `bool`    | Right-align column for numeric data                      |
| `date`       | `bool`    | Format as date/time                                      |
| `component`  | `func`    | Custom render function `(rowData) => ReactElement`       |
| `cellProps`  | `object`  | Additional props for table cells                         |
| `subRow`     | `bool`    | Column contains expandable sub-table data                |
| `iconColor`  | `string`  | Color for expand/collapse icons                          |
| `openIcon`   | `element` | Custom icon for expanding                                |
| `closeIcon`  | `element` | Custom icon for collapsing                               |

## Server-Side Mode

When `serverSide={true}`, the component switches from internal client-side state to externally-controlled props. This lets you paginate, sort, and search against a backend API — ideal for datasets with thousands of rows.

- `data` should contain **only the current page rows**, not the entire dataset
- Pagination is controlled via `page`, `onPageChange`, `rowsPerPage`, `onRowsPerPageChange`, and `totalCount`
- Sorting fires `onSortChange({ order, orderBy })` on column header click
- Search fires `onSearchChange(term)` on input change

```jsx
function MyPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ order: "asc", orderBy: "" });

  // Debounced fetch — only 1 page at a time
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
      fetch(
        `/api/data?page=${page}&size=${rowsPerPage}` +
        `&search=${search}&sort=${sort.orderBy}&dir=${sort.order}`
      )
        .then((r) => r.json())
        .then(({ data, total }) => {
          setRows(data);
          setTotalCount(total);
        })
        .finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(timer);
  }, [page, rowsPerPage, search, sort]);

  return (
    <UniversalTable
      serverSide
      data={rows}
      totalCount={totalCount}
      page={page}
      onPageChange={setPage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={setRowsPerPage}
      onSortChange={setSort}
      onSearchChange={(term) => {
        setPage(0);
        setSearch(term);
      }}
      headers={headers}
      loading={loading}
      setLoading={setLoading}
    />
  );
}
```

## Advanced Examples

### With Row Selection

```jsx
<UniversalTable
  data={data}
  headers={headers}
  name="Selectable Users"
  selectRows={true}
  selectID="id"
  onSelection={(selectedIds) => {
    console.log("Selected:", selectedIds);
  }}
/>
```

### With Custom Cell Rendering

```jsx
const headers = [
  { id: "name", label: "Name", searchable: true },
  {
    id: "status",
    label: "Status",
    component: (row) => (
      <Chip
        label={row.status}
        color={row.status === "active" ? "success" : "default"}
      />
    ),
  },
];
```

### With Sub-tables

```jsx
const headers = [
  { id: "name", label: "Department", searchable: true },
  {
    id: "employees",
    label: "Employees",
    subRow: true,
    headers: [
      { id: "name", label: "Employee Name", searchable: true },
      { id: "role", label: "Role" },
    ],
  },
];
```

## License

MIT

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

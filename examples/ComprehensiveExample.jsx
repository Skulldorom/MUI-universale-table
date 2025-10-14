import React, { useState } from "react";
import { UniversalTable } from "mui-universale-table";
import { Chip, Avatar } from "@mui/material";
import { Person, Business } from "@mui/icons-material";

// Sample data
const sampleData = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@company.com",
    age: 32,
    department: "Engineering",
    status: "active",
    joinDate: "2022-01-15T08:00:00Z",
    projects: [
      { name: "Project Alpha", role: "Lead Developer" },
      { name: "Project Beta", role: "Backend Developer" },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@company.com",
    age: 28,
    department: "Design",
    status: "active",
    joinDate: "2022-03-20T08:00:00Z",
    projects: [{ name: "Project Gamma", role: "UI Designer" }],
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob.johnson@company.com",
    age: 35,
    department: "Marketing",
    status: "inactive",
    joinDate: "2021-11-10T08:00:00Z",
    projects: [],
  },
];

// Header configuration with custom components and sub-tables
const headers = [
  {
    id: "name",
    label: "Name",
    searchable: true,
    component: (row) => (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Avatar sx={{ width: 32, height: 32 }}>
          <Person />
        </Avatar>
        {row.name}
      </div>
    ),
  },
  {
    id: "email",
    label: "Email",
    searchable: true,
  },
  {
    id: "age",
    label: "Age",
    numeric: true,
  },
  {
    id: "department",
    label: "Department",
    searchable: true,
    component: (row) => (
      <Chip
        icon={<Business />}
        label={row.department}
        variant="outlined"
        size="small"
      />
    ),
  },
  {
    id: "status",
    label: "Status",
    component: (row) => (
      <Chip
        label={row.status}
        color={row.status === "active" ? "success" : "default"}
        size="small"
      />
    ),
  },
  {
    id: "joinDate",
    label: "Join Date",
    date: true,
  },
  {
    id: "projects",
    label: "Projects",
    subRow: true,
    headers: [
      { id: "name", label: "Project Name", searchable: true },
      { id: "role", label: "Role", searchable: true },
    ],
    subTitle: "Employee Projects",
  },
];

export default function ComprehensiveExample() {
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleReload = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleSelection = (selected) => {
    setSelectedRows(selected);
    console.log("Selected rows:", selected);
    // You could perform bulk actions here
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>MUI Universal Table - Comprehensive Example</h1>

      <h2>Basic Table</h2>
      <UniversalTable
        data={sampleData}
        headers={headers.filter((h) => !h.subRow)} // Exclude sub-table for basic example
        name="Employee Directory"
        loading={loading}
        setLoading={handleReload}
      />

      <h2>Table with Row Selection</h2>
      <UniversalTable
        data={sampleData}
        headers={headers}
        name="Employees with Selection"
        loading={loading}
        setLoading={handleReload}
        selectRows={true}
        selectID="id"
        onSelection={handleSelection}
      />

      <h2>Table with Sub-tables</h2>
      <UniversalTable
        data={sampleData}
        headers={headers}
        name="Employees with Projects"
        loading={loading}
        setLoading={handleReload}
      />

      {selectedRows.length > 0 && (
        <div
          style={{
            marginTop: 20,
            padding: 16,
            backgroundColor: "#f5f5f5",
            borderRadius: 4,
          }}
        >
          <h3>Selected Employee IDs:</h3>
          <p>{selectedRows.join(", ")}</p>
        </div>
      )}
    </div>
  );
}

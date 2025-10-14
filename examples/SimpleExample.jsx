import React, { useState } from "react";
import { UniversalTable } from "mui-universale-table";

// Simple data structure
const users = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    age: 28,
    city: "New York",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    age: 34,
    city: "San Francisco",
  },
  {
    id: 3,
    name: "Carol White",
    email: "carol@example.com",
    age: 29,
    city: "Chicago",
  },
  {
    id: 4,
    name: "David Brown",
    email: "david@example.com",
    age: 42,
    city: "Austin",
  },
  {
    id: 5,
    name: "Eva Davis",
    email: "eva@example.com",
    age: 31,
    city: "Seattle",
  },
];

// Simple header configuration
const headers = [
  { id: "name", label: "Full Name", searchable: true },
  { id: "email", label: "Email Address", searchable: true },
  { id: "age", label: "Age", numeric: true },
  { id: "city", label: "City", searchable: true },
];

export default function SimpleExample() {
  const [loading, setLoading] = useState(false);

  return (
    <div style={{ padding: 20 }}>
      <h1>Simple Table Example</h1>
      <UniversalTable
        data={users}
        headers={headers}
        name="User Directory"
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
}

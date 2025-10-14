import React from "react";
import { UniversalTable } from "../src/index.js";

// Basic test to ensure the component can be imported and used
const TestComponent = () => {
  const headers = [
    { id: "name", label: "Name", searchable: true },
    { id: "email", label: "Email", searchable: true },
    { id: "age", label: "Age", numeric: true },
  ];

  const data = [
    { name: "John Doe", email: "john@example.com", age: 30 },
    { name: "Jane Smith", email: "jane@example.com", age: 25 },
  ];

  return (
    <UniversalTable
      data={data}
      headers={headers}
      name="Test Users"
      loading={false}
    />
  );
};

export default TestComponent;

import React, { useMemo } from "react";
import DataGrid from "./DataGrid";
import Column from "./DataGrid/types";
import data from "./data.json";

const DataGridExample = () => {
  const columns = useMemo<Column[]>(
    () => [
      // { accessor: "id", header: "Id", editable: false, width: 50 },
      {
        accessor: "avatar",
        header: "Avatar",
        renderCell: (row: any) => <img src={row.avatar} alt="" />,
        sortable: false,
        editable: true,
        type: "text",
        width: 100,
      },
      {
        accessor: "name",
        header: "Name",
        editable: true,
        filterable: true,
        type: "text",
        sortable: true,
        width: 100,
        props: {
          required: true,
        },
      },
      {
        accessor: "email",
        header: "Email",
        editable: true,
        filterable: true,
        type: "text",
        width: 100,
        sortable: true,
        props: {
          required: true,
        },
      },
      {
        accessor: "role",
        header: "Role",
        filterable: true,
        editable: true,
        width: 150,
        type: "select",
        options: ["basic", "editor", "admin"],
      },
      {
        accessor: "createdAt",
        header: "Created At",
        editable: true,
        sortable: true,
        width: 150,
        type: "date",
        props: {
          required: true,
        },
      },
      {
        accessor: "firstName",
        header: "First Name",
        renderCell: (row: any) => <p>{row.name.split(" ")[0]}</p>,
        sortable: false,
        editable: false,
        width: 100,
      },
    ],

    []
  );

  const validation = (values: any) => {
    let errors = [];
    if (!values.name) {
      errors.push("Name is Required");
    }

    if (!values.email) {
      errors.push("Email is Required");
    }

    if (!values.role) {
      errors.push("Role is required");
    }

    if (!values.createdAt) {
      errors.push("Created At is required");
    }

    return errors;
  };

  return (
    <div>
      <DataGrid columns={columns} validation={validation} data={data} />
    </div>
  );
};

export default DataGridExample;

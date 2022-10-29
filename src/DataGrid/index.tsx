import React, { useReducer, useState } from "react";
import Form from "./Form";
import reducer from "./reducer";
import Thead from "./Thead";
import Column from "./types";
import Row from "./Row";
import "./styles.css";

interface Props {
  columns: Column[];
  data: any;
  validation?: (values: any) => string[];
  updateHandler?: (values: any) => Promise<any>;
  deleteHandler?: (id: any) => Promise<any>;
  insertHandler?: (values: any) => Promise<any>;
}

const DataGrid: React.FC<Props> = ({ columns, data, validation }) => {
  const [state, dispatch] = useReducer(reducer, {
    rows: data,
    sort: {
      property: "",
      asc: true,
    },
  });

  const [showForm, setShowForm] = useState<boolean>(false);

  const sortBy = (property: string, asc: boolean) => {
    dispatch({
      type: "SORT_BY",
      payload: {
        property,
        asc,
      },
    });
  };

  const handleDelete = (identifier: any, value: any) => {
    dispatch({
      type: "DELETE_ROW",
      payload: {
        identifier,
        value,
      },
    });
  };

  return (
    <div className="Grid-Container">
      <button className="add-btn" onClick={() => setShowForm(true)}>
        Add Row
      </button>
      {showForm && (
        <Form
          columns={columns}
          setShowForm={setShowForm}
          validation={validation}
        />
      )}
      <div className="table-container">
        <table>
          <colgroup>
            <col style={{ width: "100px" }} />
            {columns.map((column: Column, index: number) => (
              <col
                key={index}
                style={{
                  width: column.width ? `${column.width}px` : "100px",
                }}
              />
            ))}
          </colgroup>
          <Thead headers={columns} sort={state.sort} handleSort={sortBy} />
          <tbody>
            {state.rows.map((row: any, index: number) => (
              <Row
                key={row.id}
                row={row}
                columns={columns}
                validation={validation}
                handleDelete={handleDelete}
                // handleUpdate={handleUpdate}
                // handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataGrid;

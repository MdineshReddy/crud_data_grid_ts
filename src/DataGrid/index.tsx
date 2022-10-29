import React, { useReducer, useState, useEffect } from "react";
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
    rows: [],
    sort: {
      property: "",
      asc: true,
    },
    filters: {},
  });

  const [filteredRows, setFiltedRows] = useState(state.rows);

  useEffect(() => {
    const newFilteredRows = state.rows.filter((row: any) => {
      const filterProps = Object.keys(state.filters);
      let satify = filterProps.every((filterProp) =>
        String(row[filterProp])
          .toLowerCase()
          .includes(String(state.filters[filterProp]).toLowerCase())
      );
      if (satify) {
        return row;
      }
    });
    setFiltedRows(newFilteredRows);
  }, [state.filters, state.rows]);

  useEffect(() => {
    dispatch({
      type: "INIT_DATA",
      payload: data,
    });
  }, []);

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

  const handleDelete = (uuid: any) => {
    dispatch({
      type: "DELETE_ROW",
      payload: uuid,
    });
  };

  const handleUpdate = (uuid: any, data: any) => {
    dispatch({
      type: "UPDATE_ROW",
      payload: { uuid, data },
    });
  };

  const handleInsert = (data: any) => {
    dispatch({
      type: "INSERT_ROW",
      payload: data,
    });
  };

  const handleCreateNewRow = () => {
    const formElements = columns.filter((column) => column.editable);
    const columnNames = formElements.map((column) => column.accessor);
    const defaultData: any = {};
    columnNames.forEach((columnName) => {
      defaultData[columnName] = "";
    });
    dispatch({
      type: "CREATE_ROW",
      payload: defaultData,
    });
  };

  const setFilter = (property: any, value: any) => {
    dispatch({ type: "SET_FILTER", payload: { property, value } });
  };

  return (
    <div className="Grid-Container">
      <button className="add-btn" onClick={handleCreateNewRow}>
        Add Row
      </button>
      {showForm && (
        <Form
          columns={columns}
          setShowForm={setShowForm}
          validation={validation}
          handleInsert={handleInsert}
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
          <Thead
            headers={columns}
            sort={state.sort}
            handleSort={sortBy}
            setFilter={setFilter}
          />
          <tbody>
            {filteredRows.map((row: any, index: number) => (
              <Row
                key={row.id}
                row={row}
                columns={columns}
                validation={validation}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                handleInsert={handleInsert}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataGrid;

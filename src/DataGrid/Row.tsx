import React, { useRef, useState } from "react";
import Column from "./types";

interface Props {
  columns: Column[];
  row: any;
  validation?: (values: any) => string[];
  handleDelete: (uuid: any) => void;
  handleUpdate: (uuid: any, data: any) => void;
  handleInsert: (data: any) => void;
}

const Row: React.FC<Props> = ({
  columns,
  row,
  validation,
  handleDelete,
  handleUpdate,
  handleInsert,
}) => {
  const [editMode, setEditMode] = useState(row.newlyCreated ? true : false);
  const columnNames = columns.map((column: Column) => column.accessor);
  const defaultData: any = {};
  columnNames.forEach((columnName) => {
    defaultData[columnName] = row[columnName];
  });
  const [rowState, setRowState] = useState(defaultData);

  if (!editMode) {
    return (
      <tr>
        <td>
          <span
            className="icon edit"
            onClick={() => {
              setEditMode(true);
            }}
          >
            ✎
          </span>
          <span
            className="icon delete"
            onClick={() => {
              // eslint-disable-next-line no-restricted-globals
              if (confirm("Are you sure you want to delete this row?")) {
                handleDelete(row.uuid);
              }
            }}
          >
            🗑
          </span>
        </td>
        {columns.map((column: Column, index) => {
          return (
            <td key={index}>
              {column.renderCell
                ? column.renderCell(row)
                : row[column.accessor]}
            </td>
          );
        })}
      </tr>
    );
  }

  return (
    <tr>
      <td>
        <span
          className="icon save"
          onClick={() => {
            const edit = () => {
              handleUpdate(row.uuid, rowState);
              setEditMode(false);
            };
            const insert = () => {
              handleInsert(rowState);
              handleDelete(row.uuid);
            };
            if (validation) {
              let errors = validation(rowState);
              if (errors.length === 0) {
                if (!row.newlyCreated) {
                  edit();
                } else {
                  insert();
                }
              } else {
                let errMessage = errors.reduce((p, c) => (p += "\n" + c), "");
                alert(errMessage);
              }
            } else {
              if (!row.newlyCreated) {
                edit();
              } else {
                insert();
              }
            }
          }}
        >
          ✓
        </span>
        <span
          className="icon times"
          onClick={() => {
            if (row.newlyCreated) {
              handleDelete(row.uuid);
            } else {
              setRowState(defaultData);
              setEditMode(false);
            }
          }}
        >
          &#215;
        </span>
      </td>
      {columns.map((column, index) => {
        if (column.editable) {
          return (
            <td key={index}>
              {column.type === "select" ? (
                <select
                  value={rowState[column.accessor]}
                  onChange={(e) =>
                    setRowState({
                      ...rowState,
                      [column.accessor]: e.target.value,
                    })
                  }
                >
                  {column.options.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={column.type}
                  value={rowState[column.accessor]}
                  onChange={(e) =>
                    setRowState({
                      ...rowState,
                      [column.accessor]: e.target.value,
                    })
                  }
                  {...column.props}
                ></input>
              )}
            </td>
          );
        }
        return (
          <td key={index}>
            {column.renderCell ? column.renderCell(row) : row[column.accessor]}
          </td>
        );
      })}
    </tr>
  );
};

export default Row;

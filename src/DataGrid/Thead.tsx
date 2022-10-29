import React from "react";
import Column from "./types";

interface Props {
  headers: Column[];
  sort: {
    property: string;
    asc: boolean;
  };
  handleSort: (property: string, asc: boolean) => any;
}

const Thead: React.FC<Props> = ({ headers, sort, handleSort }) => {
  return (
    <thead>
      <tr>
        <th>Actions</th>
        {headers.map((headerItem) => (
          <th key={headerItem.header}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
              }}
            >
              <span>{headerItem.header}</span>
              {headerItem.sortable && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    marginLeft: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      cursor: "pointer",
                    }}
                    className={
                      sort.property === headerItem.accessor && sort.asc
                        ? "activeSort"
                        : ""
                    }
                    onClick={() => handleSort(headerItem.accessor, true)}
                  >
                    ▲
                  </span>
                  <span
                    style={{
                      cursor: "pointer",
                    }}
                    className={
                      sort.property === headerItem.accessor && !sort.asc
                        ? "activeSort"
                        : ""
                    }
                    onClick={() => handleSort(headerItem.accessor, false)}
                  >
                    ▼
                  </span>
                </div>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Thead;

import React from "react";
import Column from "./types";

interface Props {
  headers: Column[];
  sort: {
    property: string;
    asc: boolean;
  };
  handleSort: (property: string, asc: boolean) => void;
  setFilter: (property: any, value: any) => void;
}

const Thead: React.FC<Props> = ({ headers, sort, handleSort, setFilter }) => {
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
                justifyContent: headerItem.filterable ? "center" : "start",
              }}
            >
              <span
                style={{
                  margin: "1rem 0rem",
                }}
              >
                {headerItem.header}
              </span>
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
            {headerItem.filterable && (
              <input
                className="filter-row"
                placeholder={`Filter by ${headerItem.header}`}
                onChange={(e) => setFilter(headerItem.accessor, e.target.value)}
              />
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Thead;

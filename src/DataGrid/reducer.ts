import { resolveTypeReferenceDirective } from "typescript";
import { v4 as uuid } from "uuid";

interface Action {
  type: string;
  payload?: any;
}

interface State {
  rows: any;
  sort: {
    property: string;
    asc: boolean;
  };
  filters: any;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "INIT_DATA": {
      const newRows = action.payload.map((item: any) => {
        return {
          ...item,
          uuid: uuid(),
        };
      });
      return {
        ...state,
        rows: newRows,
      };
    }
    case "INSERT_ROW": {
      const newRow = { uuid: uuid(), ...action.payload };
      return {
        ...state,
        rows: [...state.rows, newRow],
        sort: {
          property: "",
          asc: false,
        },
      };
    }
    case "DELETE_ROW": {
      const newRows = state.rows.filter(
        (row: any) => row.uuid !== action.payload
      );
      return {
        ...state,
        rows: newRows,
      };
    }
    case "UPDATE_ROW": {
      const newRows = state.rows.map((row: any) => {
        if (row.uuid === action.payload.uuid) {
          return { ...row, ...action.payload.data };
        }
        return row;
      });
      return {
        ...state,
        rows: newRows,
        sort: {
          property: "",
          asc: false,
        },
        filters: {},
      };
    }
    case "CREATE_ROW": {
      return {
        ...state,
        rows: [...state.rows, { ...action.payload, newlyCreated: true }],
        sort: {
          property: "",
          asc: false,
        },
        filters: {},
      };
    }
    case "SORT_BY": {
      const property = action.payload.property;
      const asc = action.payload.asc;
      const sorted = [...state.rows].sort((a, b) => {
        if (a[property] === null) return 1;
        if (b[property] === null) return -1;
        if (a[property] === null && b[property] === null) return 0;
        return (
          a[property].toString().localeCompare(b[property].toString(), "en", {
            numeric: true,
          }) * (asc ? 1 : -1)
        );
      });
      return {
        ...state,
        sort: {
          property,
          asc,
        },
        rows: sorted,
      };
    }
    case "SET_FILTER": {
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.property]: action.payload.value,
        },
      };
    }
    default:
      return state;
  }
}

export default reducer;

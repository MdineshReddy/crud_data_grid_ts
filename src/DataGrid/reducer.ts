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
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "INSERT_ROW": {
      const newRows = [...state.rows, action.payload];
      return {
        ...state,
        rows: newRows,
        sort: {
          property: "",
          asc: false,
        },
      };
    }
    case "DELETE_ROW": {
      const newRows = state.rows.filter(
        (row: any) => row[action.payload.identifier] !== action.payload.value
      );
      return {
        ...state,
        rows: newRows,
      };
    }
    case "UPDATE_ROW": {
      const newRows = state.rows.map((row: any) => {
        if (row[action.payload.identifier] === action.payload.value) {
          return action.payload;
        }
        return row;
      });
      return {
        ...state,
        rows: newRows,
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
    default:
      return state;
  }
}

export default reducer;

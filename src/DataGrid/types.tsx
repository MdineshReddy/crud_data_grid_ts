interface BaseType {
  accessor: string;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: number;
  renderCell?: (row: any) => JSX.Element;
}

export interface NonEditableColumn extends BaseType {
  editable: false;
}

export interface InputColumn extends BaseType {
  editable: true;
  type: "text" | "number" | "date";
  props?: {
    required?: boolean;
    min?: number;
    max?: number;
    mindate?: Date;
    maxdate?: Date;
  };
}

export interface SelectColumn extends BaseType {
  editable: true;
  type: "select";
  options: string[];
  props?: {
    required?: boolean;
  };
}

type Column = NonEditableColumn | InputColumn | SelectColumn;

export default Column;

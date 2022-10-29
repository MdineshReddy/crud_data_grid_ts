import React, { useState } from "react";
import Column from "./types";

interface Props {
  setShowForm: any;
  columns: Column[];
  validation: any;
}

const Form: React.FC<Props> = ({ setShowForm, columns, validation }) => {
  const formElements = columns.filter((column) => column.editable);
  const columnNames = formElements.map((column) => column.accessor);
  const defaultData: any = {};
  columnNames.forEach((columnName) => {
    defaultData[columnName] = "";
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined = (
    e
  ) => {
    e.preventDefault();
    if (validation) {
      let errors = validation(formData);
      if (errors.length === 0) {
        // insertRow(formData);
        setShowForm(false);
      } else {
        let errMessage = errors.reduce(
          (p: string, c: string) => (p += "\n" + c),
          ""
        );
        alert(errMessage);
      }
    } else {
      // insertRow(formData);
      setShowForm(false);
    }
  };

  const [formData, setFormData] = useState(defaultData);

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h1>Add Row</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid">
            {columns.map((formElement) => {
              if (formElement.editable) {
                return (
                  <div key={formElement.accessor} className="form-item">
                    <label htmlFor={formElement.accessor}>
                      {formElement.header}
                    </label>
                    {formElement.type === "select" ? (
                      <select
                        value={formData[formElement.accessor]}
                        id={formElement.accessor}
                        name={formElement.accessor}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [formElement.accessor]: e.target.value,
                          })
                        }
                      >
                        {formElement.options.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={formElement.type}
                        id={formElement.accessor}
                        name={formElement.accessor}
                        value={formData[formElement.accessor]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [formElement.accessor]: e.target.value,
                          })
                        }
                        {...formElement.props}
                      ></input>
                    )}
                  </div>
                );
              }
            })}
          </div>
          <div className="btn-container">
            <button className="cancel btn" onClick={() => setShowForm(false)}>
              Cancel
            </button>
            <button className="submit-btn btn" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;

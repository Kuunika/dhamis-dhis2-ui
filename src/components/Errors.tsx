import React from "react";
import { useStoreState } from "./../state/hooks";
import { Typography } from "@material-ui/core";

const Errors: React.FC = () => {
  const errors = useStoreState(state => state.error.items);
  const listStyles = {
    listStyleType: "none",
    padding: 0,
    marginTop: "5px",
    marginBottom: 0
  };
  const errorContainerStyles = {
    backgroundColor: "pink",
    padding: "10px",
    borderRadius: "6px"
  };
  return (
    <div style={errorContainerStyles} data-testid="errors-container">
      <Typography variant="subtitle2">
        Please correct the following errors before submiting:
      </Typography>
      <ul style={listStyles}>
        {errors.map((error, index) => (
          <li key={index}>
            <Typography>
              - <span style={{ textDecoration: "capitalize" }}>{error}</span>
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Errors;

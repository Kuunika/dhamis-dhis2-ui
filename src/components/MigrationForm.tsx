import React from "react";
import { Period, Programs, Description, Migrate, StyledBox } from ".";
import Errors from "./Errors";
import { useStoreState } from "../state/hooks";

const MigrationForm = () => {
  const marginBottom = "20px";
  const showErrors = useStoreState(state => state.error.showErrors);
  return (
    <React.Fragment>
      <StyledBox marginBottom={marginBottom} marginTop={"20px"}>
        <Period />
      </StyledBox>
      <StyledBox marginBottom={marginBottom}>
        <Programs />
      </StyledBox>
      <StyledBox marginBottom={marginBottom}>
        <Description />
      </StyledBox>
      {showErrors && (
        <StyledBox marginBottom={marginBottom}>
          <Errors />
        </StyledBox>
      )}
      <StyledBox>
        <Migrate />
      </StyledBox>
    </React.Fragment>
  );
};

export default MigrationForm;

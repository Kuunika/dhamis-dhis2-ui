import React from "react";
import { Period, Programs, Description, Migrate, StyledBox } from ".";

const MigrationForm = () => {
  const marginBottom = "20px";
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
      <StyledBox>
        <Migrate />
      </StyledBox>
    </React.Fragment>
  );
};

export default MigrationForm;

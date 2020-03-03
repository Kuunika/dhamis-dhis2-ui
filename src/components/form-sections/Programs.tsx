import React from "react";
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button
} from "@material-ui/core";
import { useStoreActions, useStoreState } from "../../state/hooks";
import StyledBox from "../StyledBox";

const Programs = () => {
  const program = useStoreState(state => state.program);
  const programs = program.items;
  const allProgramsChecked = program.allProgramsChecked;

  const programActions = useStoreActions(actions => actions.program);
  const {
    setChecked,
    toggleAllProgramsSelected,
    setAllProgramsChecked
  } = programActions;

  const handleChange = (programIndex: number) => {
    setChecked(programIndex);
    if (
      programs.filter(program => program.checked).length ===
      programs.length - 1
    )
      setAllProgramsChecked(true);
  };
  const handleToggleSelection = () => {
    toggleAllProgramsSelected();
  };

  const isChecked = () => {
    return (
      (allProgramsChecked && programs.every(program => program.checked)) ||
      programs.every(program => program.checked)
    );
  };

  return (
    <StyledBox marginBottom="15px" marginTop="15px">
      <FormControl component="fieldset">
        <FormLabel component="legend">ART Dataset(s) to Migrate</FormLabel>
        <FormGroup>
          {programs.map((program, index) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={program.checked}
                  value={program.value}
                  onChange={() => handleChange(index)}
                />
              }
              label={program.name}
              key={program.value}
              data-testid="program-option"
              data-value={program.value}
            />
          ))}
        </FormGroup>
        <div>
          <Button size="small" onClick={handleToggleSelection}>
            {!isChecked() ? "select all" : "unselect all"}
          </Button>
        </div>
      </FormControl>
    </StyledBox>
  );
};

export default Programs;

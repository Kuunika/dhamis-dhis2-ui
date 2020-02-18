import React from "react";
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import { useStoreActions, useStoreState } from "../../state/hooks";

const Programs = () => {
  const program = useStoreState(state => state.program);

  const programs = program.items;
  const allProgramsChecked = program.allProgramsChecked;

  const programActions = useStoreActions(actions => actions.program);
  const { setChecked, toggleAllProgramsSelected } = programActions;

  const handleChange = (
    programIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChecked(programIndex);
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
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">Select ART Dataset to Migrate</FormLabel>
        <FormControlLabel
          control={
            <Checkbox
              checked={isChecked()}
              value={false}
              onChange={handleToggleSelection}
            />
          }
          label={<span>{!isChecked() ? "select all" : "unselect all"}</span>}
        />
        <FormGroup>
          {programs.map((program, index) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={program.checked}
                  value={12}
                  onChange={e => handleChange(index, e)}
                />
              }
              label={program.name}
              key={program.value}
            />
          ))}
        </FormGroup>
      </FormControl>
    </>
  );
};

export default Programs;

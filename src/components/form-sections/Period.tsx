import React from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel
} from "@material-ui/core";
import { useStoreActions, useStoreState } from "../../state/hooks";
import KV from "../../interfaces/types/kv";
import StyledBox from "../StyledBox";

const Period = () => {
  const selectFormControlStyles = {
    width: "100%"
  };

  const period = useStoreState(state => state.period.period);
  const { years, uiQuarters, currentQuarter, currentYear } = period;

  const updateYear = useStoreActions(actions => actions.period.updateYear);
  const updateQuarter = useStoreActions(
    actions => actions.period.updateQuarter
  );

  const handleChange = (event: React.ChangeEvent<KV>) => {
    if (event.target.name === "year") updateYear(event.target.value);
    else updateQuarter(event.target.value);
  };

  return (
    <React.Fragment>
      <FormControl component="fieldset" style={{ width: "100%" }}>
        <StyledBox marginBottom="10px">
          <FormLabel component="legend">Migration Period</FormLabel>
        </StyledBox>
        <Grid container justify="flex-start">
          <Grid item xs={6}>
            <div style={{ maxWidth: "98%" }}>
              <FormControl style={selectFormControlStyles}>
                <InputLabel id="demo-simple-select-label">Year</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={currentYear}
                  onChange={handleChange}
                  name="year"
                  required
                >
                  {years.map(year => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div style={{ maxWidth: "98%" }}>
              <FormControl style={selectFormControlStyles}>
                <InputLabel id="demo-simple-select-label">Quarter</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={currentQuarter}
                  onChange={handleChange}
                  name="quarter"
                  required
                >
                  {uiQuarters.map(uiQuarter => (
                    <MenuItem key={uiQuarter} value={uiQuarter}>
                      Quarter {uiQuarter}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </Grid>
        </Grid>
      </FormControl>
    </React.Fragment>
  );
};

export default Period;

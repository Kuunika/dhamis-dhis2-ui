import React from "react";
import { Button, CircularProgress } from "@material-ui/core";
import { useStoreState, useStoreActions } from "./../../state/hooks";
import {
  validateDescription,
  validatePeriod,
  validatePrograms
} from "../../modules/validators";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import clsx from "clsx";
import {
  confirmMigrationAlert,
  migrationInitiatedAlert,
  alertOnError
} from "../../modules/alerts";
import { processFacilities } from "../../modules/processors";

const Migrate = () => {
  const periodState = useStoreState(state => state.period.period);
  const programs = useStoreState(state => state.program.items);
  const text = useStoreState(state => state.description.text);
  const facilities = useStoreState(state => state.facility.items);
  const isMigrating = useStoreState(state => state.app.isMigrating);
  const setMigrating = useStoreActions(actions => actions.app.setMigrating);
  const addError = useStoreActions(actions => actions.error.add);
  const setShowErrors = useStoreActions(actions => actions.error.setShowErrors);
  const clearErrors = useStoreActions(actions => actions.error.clear);
  const { program, period, description } = useStoreActions(actions => actions);

  const validate = async () => {
    clearErrors();

    const isValidPeriod = validatePeriod(periodState);
    !isValidPeriod && addError("Select a valid period");
    const isValidPrograms = validatePrograms(programs);
    !isValidPrograms && addError("Select at least one program");
    const isValidDescription = validateDescription(text);
    !isValidDescription && addError("Provide a proper description");

    //TODO: might wanna make sure the necessary feedback is sent to the client
    if (!isValidPeriod || !isValidPrograms || !isValidDescription) {
      setShowErrors(true);
      return;
    }

    const programsText = programs
      .filter(program => program.checked)
      .reduce(
        (acc, program) => `${acc ? `${acc},` : `${acc}<br />`}${program.name}`,
        ""
      );

    confirmMigrationAlert(migrate, programsText, periodState);
  };

  const migrate = async () => {
    setMigrating(true);
    const periodId =
      periodState.quarters.find(
        quarter =>
          quarter.year === periodState.currentYear &&
          quarter.quarter === periodState.currentQuarter
      )?.id || null;

    //TODO: might wanna make sure the necessary feedback is sent to the client
    if (!periodId) {
      alertOnError("what went wrong");
      return;
    }

    const checkedPrograms = programs.filter(program => program.checked);
    const allProgramsData: any[] = await processFacilities(
      facilities,
      checkedPrograms,
      periodId
    );

    const facilityData = allProgramsData.reduce((accumulated, current) => {
      return [...accumulated, ...current["facilities"]];
    }, []);

    const properFacilities = facilityData.filter(
      (fd: any) => fd["facility-code"]
    );

    const dhamisData = properFacilities.map((pf: any) => ({
      ...pf,
      values: pf["values"]
        .filter((v: any) => v["product-code"])
        .map((v: any) => ({
          value: v.value,
          "product-code": v["product-code"]
        }))
    }));

    const payload = {
      text,
      "reporting-period": `${periodState.currentYear}Q${periodState.currentQuarter}`,
      facilities: dhamisData
    };

   
    //TODO: give necessary feedback'
    migrationInitiatedAlert();

    setMigrating(false);

    // TODO: maybe done better
    program.clear();
    description.clear();
    period.clear();
  };

  const useStyles = makeStyles(theme => ({
    root: {
      display: "flex",
      alignItems: "center"
    },
    wrapper: {
      margin: theme.spacing(1),
      position: "relative"
    },
    buttonSuccess: {
      backgroundColor: blue[500],
      "&:hover": {
        backgroundColor: blue[700]
      }
    },
    buttonProgress: {
      color: blue[500],
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12
    }
  }));

  const classes = useStyles();
  const buttonClassname = clsx({
    [classes.buttonSuccess]: true
  });

  return (
    <React.Fragment>
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <Button
            variant="contained"
            color="primary"
            className={buttonClassname}
            disabled={isMigrating}
            onClick={validate}
          >
            {isMigrating ? "Migrating..." : "Migrate"}
          </Button>
          {isMigrating && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Migrate;

import React from "react";
import { Button, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useStoreState } from "./../../state/hooks";
import Period from "../../interfaces/types/period";
import Program from "../../interfaces/types/program";
import Axios from "axios";

const validatePeriod = (period: Period): boolean => {
  return period.currentQuarter !== "0" && period.currentYear !== "0";
};

const validatePrograms = (programs: Program[]): boolean => {
  return programs.filter(program => program.checked).length > 0;
};

const validateDescription = (text: string): boolean => {
  return text.length >= 5;
};
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));
const Migrate = () => {
  let period = useStoreState(state => state.period.period);
  let programs = useStoreState(state => state.program.items);
  let description = useStoreState(state => state.description.text);
  const facilities = useStoreState(state => state.facility.items);

  const migrate = async () => {
    const {
      REACT_APP_INTEROP_CLIENT_USERNAME = "",
      REACT_APP_INTEROP_CLIENT_PASSWORD = "",
      REACT_APP_INTEROP_URL = "",
      REACT_APP_DHAMIS_API_URL = "",
      REACT_APP_DHAMIS_API_KEY = ""
    } = process.env;
    //TODO: verify the correctness of payload
    //TODO: check that period  is valid
    const isValidPeriod = validatePeriod(period);
    //TODO: check that atleast a program is selected
    const isValidPrograms = validatePrograms(programs);
    //TODO: check that the payload description is provided, alot more checks could be to do with length os the string and what not
    const isValidDescription = validateDescription(description);

    //TODO: might wanna make sure the necessary feedback is sent to the client
    if (!isValidPeriod || !isValidPrograms || !isValidDescription) return;

    const periodId =
      period.quarters.find(
        quarter =>
          quarter.year === period.currentYear &&
          quarter.quarter === period.currentQuarter
      )?.id || null;

    //TODO: might wanna make sure the necessary feedback is sent to the client
    if (!periodId) return;

    const allProgramsData: any[] = [];
    const checkedPrograms = programs.filter(program => program.checked);
    const facilityIds = facilities
      .slice(600)
      .reduce((acc, cur) => `${acc},${cur.id}`, "")
      .slice(1);

    for (let program of checkedPrograms) {
      try {
        const url = `${REACT_APP_DHAMIS_API_URL}/${program.value}/get/${REACT_APP_DHAMIS_API_KEY}/${periodId}/${facilityIds}`;
        console.log(url);
        const response = await Axios.get(url);
        allProgramsData.push(response.data);
      } catch (e) {
        console.log(e.message);
      }
    }

    //TODO: avoid duplication of keys
    const facilityData = allProgramsData.reduce((accumulated, current) => {
      return [...accumulated, ...current["facilities"]];
    }, []);

    //TODO: filter all the missing facilities and products
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

    console.log(dhamisData);

    const payload = {
      description,
      "reporting-period": `${period.currentYear}Q${period.currentQuarter}`,
      facilities: dhamisData
    };

    // const ilResponse = await Axios.post(
    //   `${REACT_APP_INTEROP_URL}/data-elements`,
    //   payload,
    //   {
    //     auth: {
    //       username: REACT_APP_INTEROP_CLIENT_USERNAME,
    //       password: REACT_APP_INTEROP_CLIENT_PASSWORD
    //     }
    //   }
    // );
    // console.log(ilResponse);
    //TODO: give necessary feedback
  };

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={false}
        onClose={() => {}}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Text in a modal</h2>
          <p id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
        </div>
      </Modal>
      <Button variant="contained" color="primary" onClick={migrate}>
        Migrate
      </Button>
    </React.Fragment>
  );
};

export default Migrate;

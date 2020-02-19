import React from "react";
import { Button } from "@material-ui/core";
import { useStoreState, useStoreActions } from "./../../state/hooks";
import Axios from "axios";
import {
  validateDescription,
  validatePeriod,
  validatePrograms
} from "../../utils/validation";
import Swal from "sweetalert2";
import program from "../../state/models/program";

const Migrate = () => {
  const period = useStoreState(state => state.period.period);
  const programs = useStoreState(state => state.program.items);
  const description = useStoreState(state => state.description.text);
  const facilities = useStoreState(state => state.facility.items);
  const addError = useStoreActions(actions => actions.error.add);
  const setShowErrors = useStoreActions(actions => actions.error.setShowErrors);
  const clearErrors = useStoreActions(actions => actions.error.clear);

  const validate = async () => {
    clearErrors();
    //TODO: verify the correctness of payload
    //TODO: check that period  is valid
    const isValidPeriod = validatePeriod(period);
    !isValidPeriod && addError("Select a valid period");
    //TODO: check that atleast a program is selected
    const isValidPrograms = validatePrograms(programs);
    !isValidPrograms && addError("Select at least one program");
    //TODO: check that the payload description is provided, alot more checks could be to do with length os the string and what not
    const isValidDescription = validateDescription(description);
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

    Swal.fire({
      title: "Confirm Migration",
      html: `
        <div style="margin: 0;">
          <h5 style="margin: 0;">Programs: </h5>
          ${programsText}
          <h5>Period</h5>
          ${period.currentYear} Quarter ${period.currentQuarter}
        </div>
      `,
      confirmButtonColor: "#3f51b5",
      confirmButtonText: "Yes, Migrate",
      showCancelButton: true,
      cancelButtonColor: "#d33"
    }).then(result => {
      if (result.value) {
        migrate();
      }
    });
  };

  const migrate = async () => {
    const {
      REACT_APP_INTEROP_CLIENT_USERNAME = "",
      REACT_APP_INTEROP_CLIENT_PASSWORD = "",
      REACT_APP_INTEROP_URL = "",
      REACT_APP_DHAMIS_API_URL = "",
      REACT_APP_DHAMIS_API_KEY = ""
    } = process.env;

    const periodId =
      period.quarters.find(
        quarter =>
          quarter.year === period.currentYear &&
          quarter.quarter === period.currentQuarter
      )?.id || null;

    //TODO: might wanna make sure the necessary feedback is sent to the client
    if (!periodId) return;

    //TODO: make sure all facilities are handled
    const allProgramsData: any[] = [];
    const checkedPrograms = programs.filter(program => program.checked);
    const facilityIds = facilities
      .slice(0, 10)
      .reduce((acc, cur) => `${acc},${cur.id}`, "")
      .slice(1);
    console.log(facilityIds);
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
    //TODO: give necessary feedbackr'
    Swal.fire({
      icon: "success",
      title: "Migration Initiated",
      text: "An email will be sent once the migration has finished",
      confirmButtonColor: "#3f51b5",
      confirmButtonText: "okay"
    }).then(result => {
      if (result.value) {
        console.log("now is the time");
      }
    });
    Swal.fire(
      "Migration Initiated",
      "An email will be sent once the migration has finished",
      "success"
    );
  };

  return (
    <React.Fragment>
      <Button variant="contained" color="primary" onClick={validate}>
        Review
      </Button>
    </React.Fragment>
  );
};

export default Migrate;

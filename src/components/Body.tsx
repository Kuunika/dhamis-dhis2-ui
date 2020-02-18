import React, { useEffect } from "react";
import { Container, Card, CardContent, Typography } from "@material-ui/core";
import MigrationForm from "./MigrationForm";
import { useStoreActions } from "../state/hooks";
import axios from "axios";
import Facility from "../interfaces/types/facility";
import { StyledBox } from ".";

const Body = () => {
  const { REACT_APP_DHAMIS_API_URL, REACT_APP_DHAMIS_API_KEY } = process.env;
  const initializePeriod = useStoreActions(
    state => state.period.initializePeriod
  );
  const initializeFacilities = useStoreActions(
    state => state.facility.initializeFacilities
  );
  useEffect(() => {
    axios
      .get(`${REACT_APP_DHAMIS_API_URL}/quarters/${REACT_APP_DHAMIS_API_KEY}`)
      .then(response => {
        const years = Array.from(
          new Set(response.data.map((data: any) => data.year))
        ).map(s => String(s));
        const [currentYear] = years;
        const uiQuarters = ["1", "2", "3", "4"];
        const [currentQuarter] = uiQuarters;
        initializePeriod({
          years,
          currentQuarter,
          currentYear,
          uiQuarters,
          quarters: response.data
        });
      })
      .catch(e => {
        //TODO: give user feedback
        console.log(e);
      });

    axios
      .get(
        `${REACT_APP_DHAMIS_API_URL}/healthfacilities/get/${REACT_APP_DHAMIS_API_KEY}`
      )
      .then(response => {
        const facilities: Facility[] = response.data.map((d: any) => ({
          facility_name: d.facility_name,
          id: d.id
        }));
        initializeFacilities(facilities);
      })
      .catch(e => {
        //TODO: give user feedback
        console.log(e);
      });
  });
  return (
    <React.Fragment>
      <StyledBox marginTop="20px">
        <Container maxWidth="sm">
          <Card raised={true}>
            <CardContent>
              <Typography variant="h5" align="center" color="primary">
                DHAMIS TO DHIS2 MIGRATOR
              </Typography>
              <MigrationForm />
            </CardContent>
          </Card>
        </Container>
      </StyledBox>
    </React.Fragment>
  );
};

export default Body;

import React, { useEffect } from "react";
import { Container, Card, CardContent, Typography } from "@material-ui/core";
import MigrationForm from "./MigrationForm";
import { useStoreActions, useStoreState } from "../state/hooks";
import axios from "axios";
import Facility from "../interfaces/types/facility";
import { StyledBox, BodyLoading } from ".";
import { Initializer } from "../state/models/app";

const Body = () => {
  const { REACT_APP_DHAMIS_API_URL, REACT_APP_DHAMIS_API_KEY } = process.env;
  const initializePeriod = useStoreActions(
    state => state.period.initializePeriod
  );
  const appInitialized = useStoreState(state => state.app.appInitialized);
  const init = useStoreActions(actions => actions.app.init);

  const initializeFacilities = useStoreActions(
    state => state.facility.initializeFacilities
  );

  useEffect(() => {
    axios
      .get(`${REACT_APP_DHAMIS_API_URL}/quarters/${REACT_APP_DHAMIS_API_KEY}`)
      .then(response => {
        if (response.data instanceof Array) {
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
          init(Initializer.PERIOD);
        } else {
          throw new Error("Returned period data is not processable");
        }
      })
      .catch(e => {
        alert(e.message);
      });

    axios
      .get(
        `${REACT_APP_DHAMIS_API_URL}/healthfacilities/get/${REACT_APP_DHAMIS_API_KEY}`
      )
      .then(response => {
        if (response.data instanceof Array) {
          const facilities: Facility[] = response.data.map((d: any) => ({
            facility_name: d.facility_name,
            id: d.id
          }));
          initializeFacilities(facilities);
          init(Initializer.FACILITIES);
        } else {
          throw new Error("Returned facilities data is not processable");
        }
      })
      .catch(e => {
        alert(e.message);
      });
  });
  const appLoadedUI = (
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

  return appInitialized ? appLoadedUI : <BodyLoading />;
};

export default Body;

import React from "react";
import { Container, Card, CardContent, Grid } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { StyledBox } from ".";

const BodyLoading = () => {
  const regularMargin = "8px";
  return (
    <React.Fragment>
      <StyledBox marginTop="20px">
        <Container maxWidth="sm">
          <Card raised={true}>
            <CardContent>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <Skeleton variant="rect" height={30} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Skeleton variant="rect" height={30} />
                </Grid>
                <Grid item xs={10}>
                  <StyledBox marginTop={regularMargin} marginBottom="5px">
                    <Skeleton variant="text" height={30} />
                  </StyledBox>
                </Grid>
                {Array(3)
                  .fill(undefined)
                  .map((_, index) => (
                    <StyledBox marginBottom={regularMargin} key={index}>
                      <Grid container spacing={2}>
                        <Grid item xs={1}>
                          <Skeleton variant="rect" height={30} />
                        </Grid>
                        <Grid item xs={6}>
                          <Skeleton variant="rect" height={30} />
                        </Grid>
                      </Grid>
                    </StyledBox>
                  ))}
                <Grid item xs={12}>
                  <Skeleton variant="rect" width="100" height={120} />
                </Grid>
              </Grid>
              <StyledBox marginTop={regularMargin}>
                <Skeleton variant="rect" width={80} height={40} />
              </StyledBox>
            </CardContent>
          </Card>
        </Container>
      </StyledBox>
    </React.Fragment>
  );
};

export default BodyLoading;

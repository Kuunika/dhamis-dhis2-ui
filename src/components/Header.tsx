import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
const Header = () => {
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar></Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;

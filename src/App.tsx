import React from "react";
import "./App.css";
import "typeface-roboto";
import { StoreProvider } from "easy-peasy";
import store from "./state/store";

import { Header, Footer, Body } from "./components";

const App = () => {
  return (
    <StoreProvider store={store}>
      <Header />
      <Body />
      <Footer />
    </StoreProvider>
  );
};

export default App;

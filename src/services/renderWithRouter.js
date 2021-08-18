import React from "react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { render } from "@testing-library/react";

const renderWithRouter = (anyComponent) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{anyComponent}</Router>),
    history,
  };
};

export default renderWithRouter;

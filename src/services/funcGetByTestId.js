import { screen } from "@testing-library/react";
import renderWithRouter from "./renderWithRouter";

const funcGetByTestId = (anyComponent, id) => {
  renderWithRouter(anyComponent);
  const tested = screen.getAllByTestId(id);
  return expect(tested).toBeDefined();
};

export default funcGetByTestId;

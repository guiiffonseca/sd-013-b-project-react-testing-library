import { screen } from "@testing-library/react";
import renderWithRouter from "./renderWithRouter";

const funcGetByTestId = (anyComponent, id, x, c, y, add) => {
  renderWithRouter(anyComponent);
  if (add) {
    const tested = screen.getAllByTestId(id);
    return expect(tested[x]).not.toBe(y);
  }
  const tested = screen.getByTestId(id);
  return expect(tested[x])[c](y);
};

export default funcGetByTestId;

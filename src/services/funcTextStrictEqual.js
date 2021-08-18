import { screen } from "@testing-library/react";
import renderWithRouter from "../services/renderWithRouter";

const funcTextStrictEqual = (anyComponent, role, properties, checkedTest, add) => {
  renderWithRouter(anyComponent);
  const tested = screen.getByRole(role, properties);
  if (add) {
    return expect(tested[add]).toStrictEqual(checkedTest);
  }
  return expect(tested).toStrictEqual(checkedTest);
};

export default funcTextStrictEqual;

import { screen } from "@testing-library/react";
import renderWithRouter from "../services/renderWithRouter";

const funcTextStrictEqual = (text, checkedTest) => {
  renderWithRouter(anyComponent);
  const tested = screen.getAllByText(text);
  return expect(tested).toStrictEqual(checkedTest);
};

export default funcTextStrictEqual;

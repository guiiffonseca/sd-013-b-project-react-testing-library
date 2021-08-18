import { screen } from "@testing-library/react";
import renderWithRouter from "../services/renderWithRouter";

const funcLengthOfGetAll = (text, length) => {
  renderWithRouter(anyComponent);
  const tested = screen.getAllByText(text);
  return expect(tested).toHaveLength(length);
};

export default funcLengthOfGetAll;

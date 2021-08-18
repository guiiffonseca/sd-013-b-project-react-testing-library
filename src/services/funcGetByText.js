import { screen } from "@testing-library/react";
import renderWithRouter from "../services/renderWithRouter";

const funcGetByText = (text) => {
  renderWithRouter(anyComponent);
  const tested = screen.getByText(text);
  return expect(tested).toBeInTheDocument();
};

export default funcGetByText;

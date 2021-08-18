import { screen } from "@testing-library/react";
import renderWithRouter from "../services/renderWithRouter";

const funcGetByRole = (anyComponent, role, regex) => {
  renderWithRouter(anyComponent);
  const tested = screen.getByRole(role, { name: regex });
  return expect(tested).toBeDefined();
};

export default funcGetByRole;

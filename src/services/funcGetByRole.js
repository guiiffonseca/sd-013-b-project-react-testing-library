import { screen } from "@testing-library/react";
import renderWithRouter from "../services/renderWithRouter";

const funcGetByRole = (anyComponent, role, properties) => {
  renderWithRouter(anyComponent);
  const tested = screen.getByRole(role, properties);
  return expect(tested).toBeDefined();
};

export default funcGetByRole;

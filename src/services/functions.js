//Testando exportar tudo. Algo deu errado.

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouter from "../services/renderWithRouter";

export const funcTextStrictEqualB = (anyComponent, role, properties, checkedTest, add) => {
  renderWithRouter(anyComponent);
  const tested = screen.getByRole(role, properties);
  if (add) {
    return expect(tested[add]).toStrictEqual(checkedTest);
  }
  return expect(tested).toStrictEqual(checkedTest);
}

export const funcClickRoleB = (anyComponent, role, properties, text) => {
  const { history } = renderWithRouter(anyComponent);
  const tested = screen.getByRole(role, properties);
  userEvent.click(tested);
  const {
    location: { pathname },
  } = history;
  return expect(pathname).toBe(text);
};

export const funcGetByRoleB = (anyComponent, role, properties) => {
  renderWithRouter(anyComponent);
  const tested = screen.getByRole(role, properties);
  return expect(tested).toBeDefined();
};

export const funcGetByTextB = (anyComponent, text) => {
  renderWithRouter(anyComponent);
  const tested = screen.getByText(text);
  return expect(tested).toBeInTheDocument();
};

export const funcLengthOfGetAllB = (anyComponent, text, length) => {
  renderWithRouter(anyComponent);
  const tested = screen.getAllByText(text);
  return expect(tested).toHaveLength(length);
};
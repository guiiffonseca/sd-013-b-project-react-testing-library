import { screen } from "@testing-library/react";

const funcGetByRole = (role, regex) => {
  const tested = screen.getByRole(role, { name: regex });
  return expect(tested).toBeDefined();
};

export default funcGetByRole;

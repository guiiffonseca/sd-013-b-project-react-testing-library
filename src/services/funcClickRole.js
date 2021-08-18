import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouter from "../services/renderWithRouter";

const funcClickRole = (anyComponent, role, regex, text) => {
  const { history } = renderWithRouter(anyComponent);
  const tested = screen.getByRole(role, { name: regex });
  userEvent.click(tested);
  const {
    location: { pathname },
  } = history;
  return expect(pathname).toBe(text);
};

export default funcClickRole;

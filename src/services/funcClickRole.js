import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouter from "../services/renderWithRouter";

// funcClickRole:
// Param 1 render component
// Param 2 and 3 get elemento by role and properties
// Param 4 search text after click
const funcClickRole = (anyComponent, role, properties, text) => {
  const { history } = renderWithRouter(anyComponent);
  const tested = screen.getByRole(role, properties);
  userEvent.click(tested);
  const {
    location: { pathname },
  } = history;
  return expect(pathname).toBe(text);
};

export default funcClickRole;

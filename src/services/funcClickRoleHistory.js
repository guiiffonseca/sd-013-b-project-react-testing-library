import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouter from "./renderWithRouter";

// funcClickRoleHistory:
// Param 1 render component
// Param 2 and 3 get elemento by role and properties
// Param 4 search text after click
const funcClickRoleHistory = (
  anyComponent,
  role,
  what,
  result,
  property,
  ofHistory
) => {
  const { history } = renderWithRouter(anyComponent);
  const tested = screen.getByRole(...role);
  userEvent.click(tested);
  const {
    [property]: { ofHistory },
  } = history;
  return expect(ofHistory)[what](result);
};

export default funcClickRoleHistory;

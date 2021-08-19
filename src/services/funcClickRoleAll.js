import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouter from "./renderWithRouter";

// funcClickRoleAll:
// Param 1 render component
// Param 2 and 3 get elemento by role and properties
// Param 4 search text after click
const funcClickRoleAll = (
  anyComponent,
  role,
  from,
  what,
  result
) => {
  renderWithRouter(anyComponent);
  const tested = screen.getByRole(...role);
  userEvent.click(tested);
  return expect(screen.getByRole(...from))[what](result);
};

export default funcClickRoleAll;

import { screen } from "@testing-library/react";

const funcGetByText = (text) => {
  const tested = screen.getByText(text);
  return expect(tested).toBeInTheDocument();
};

export default funcGetByText;

import React from "react";
// import { screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import App from "../App";
import renderWithRouter from "../services/renderWithRouter";
import funcGetByRole from "../services/funcGetByRole";
import funcClickRole from "../services/funcClickRole";

// npx stryker run ./stryker/App.conf.json
describe("1 - Test component <APP/>", () => {
  test("3 links: 1-'Home' 2-About 3-favorite pokémons", () => {
    renderWithRouter(<App />);
    // Check role and text:
    funcGetByRole("link", /home/i);
    funcGetByRole("link", /About/i);
    funcGetByRole("link", /favorite pokémons/i);
  });
  test("test 'Home' links path", () => {
    // Testando a renderização dentro de funções:
    // Há que chamar as funções em testes separados
    // funcClickRole:
    // Param 1 render component
    // Param 2 and 3 get elemento by role and text
    // Param 4 search text afte click
    funcClickRole(<App />, "link", /home/i, "/");
  });
  test("test 'About' links path", () => {
    funcClickRole(<App />, "link", /About/i, "/about");
  });
  test("test 'Favorite Pokémons' links path", () => {
    funcClickRole(<App />, "link", /favorite pokémons/i, "/favorites");
  });
});

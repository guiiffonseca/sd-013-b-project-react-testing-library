import React from 'react';
// import { screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import App from '../App';
import funcGetByRole from '../services/funcGetByRole';
import funcClickRole from '../services/funcClickRole';

// npx stryker run ./stryker/App.conf.json
describe('1 - Test component <APP/>', () => {
  test('if there is a link with text -Home-', () => {
    funcGetByRole(<App />, 'link', /home/i);
  });
  test('if there is a link with text -About-', () => {
    funcGetByRole(<App />, 'link', /About/i);
  });
  test('if there is a link with text -Favorite pokémons-', () => {
    funcGetByRole(<App />, 'link', /favorite pokémons/i);
  });
  test('test \'Home\' links path', () => {
    // Testando a renderização dentro de funções:
    // Há que chamar as funções em testes separados
    // funcClickRole:
    // Param 1 render component
    // Param 2 and 3 get elemento by role and text
    // Param 4 search text afte click
    funcClickRole(<App />, 'link', /home/i, '/');
  });
  test('test \'About\' links path', () => {
    funcClickRole(<App />, 'link', /About/i, '/about');
  });
  test('test \'Favorite Pokémons\' links path', () => {
    funcClickRole(<App />, 'link', /favorite pokémons/i, '/favorites');
  });
});

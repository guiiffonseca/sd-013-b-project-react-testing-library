import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';

const testAppHelper = (history, linkName, path) => {
  // Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação.
  // Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.
  // Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.
  const nameLink = screen.getByRole('link', { name: linkName });
  expect(nameLink).toBeInTheDocument();
  userEvent.click(nameLink);
  const { pathname } = history.location;
  expect(pathname).toBe(path);
};
// Teste o componente <App.js />
describe('Test App', () => {
  // Teste se o topo da aplicação contém um conjunto fixo de links de navegação
  test('has a home as the 1 link, about as the 2 and Favorite as the 3', () => {
    const { history } = renderWithRouter(<App />);
    // O primeiro link deve possuir o texto Home
    testAppHelper(history, 'Home', '/');

    // O segundo link deve possuir o texto About
    testAppHelper(history, 'About', '/about');

    // O terceiro link deve possuir o texto Favorite Pokémons
    testAppHelper(history, 'Favorite Pokémons', '/favorites');
  });

  // Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida
  test('test if a link is Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('Xablau');
    expect(screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/,
    })).toBeInTheDocument();
  });
});

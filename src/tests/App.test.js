import React from 'react';
import { render, screen, within } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Testando o componente <App.js />', () => {
  const TOTAL_LINKS = 3;
  test('Testa se o <nav> contém um conjunto fixo de links de navegação', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    // capturo o elemento nav
    const navigation = screen.getByRole('navigation');
    // pego os links dentro de nav
    const InternalLinks = within(navigation).getAllByRole('link');

    /* const homeLink = InternalLinks[0];
    const aboutLink = InternalLinks[1];
    const favoriteLink = InternalLinks[2]; */

    // checo se existe no HTML, o elemento <nav>
    expect(navigation).toBeInTheDocument();
    // checo se número de links dentro de nav é igual a 3
    expect(InternalLinks.length).toBe(TOTAL_LINKS);
  });

  test('O primeiro link deve possuir o texto Home.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const linkHome = screen.getByText('Home');
    const linkAbout = screen.getByText('About');
    const linkFavorites = screen.getByText('Favorite Pokémons');

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorites).toBeInTheDocument();
  });

  test('exibe o texto página não encontrada, quando digitar uma rota inválida', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/rota-nao-existente');

    const pageNotFoundText = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });

    expect(pageNotFoundText).toBeInTheDocument();
  });

  // const linkHome = screen.getByText('Home');
  // const linkAbout = screen.getByText('About');
  // const linkFavorites = screen.getByText('Favorite Pokémons');
  // test('O segundo link deve possuir o texto About.', () => {
  //   expect(linkAbout).toBeInTheDocument();
  // });

  // test('O terceiro link deve possuir o texto Favorite Pokémons.', () => {
  //   expect(linkFavorites).toBeInTheDocument();
  // });
});

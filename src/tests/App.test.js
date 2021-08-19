import React from 'react';
import { render, screen, within } from '@testing-library/react';

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

    // checo se existe no HTML, o elemento <nav>
    expect(navigation).toBeInTheDocument();
    // checo se número de links dentro de nav é igual a 3
    expect(InternalLinks.length).toBe(TOTAL_LINKS);
  });

  test('Os links devem conter Home, About e Favorite Pokémons.', () => {
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

  test('Exibe o texto "Page requested not found", ao digitar uma rota inválida', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/rota-nao-existente');

    const pageNotFoundText = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });

    expect(pageNotFoundText).toBeInTheDocument();
  });
});

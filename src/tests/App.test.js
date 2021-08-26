import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

import App from '../App';

describe('Testa o componente App.js', () => {
  test('O topo da aplicação contém um conjunto fixo de links de navegação.', () => {
    render(<MemoryRouter><App /></MemoryRouter>);

    const links = screen.getAllByRole('link');

    expect(links[0].textContent).toMatch(/home/i);
    expect(links[1].textContent).toMatch(/about/i);
    expect(links[2].textContent).toMatch(/favorite/i);
  });

  test('Redireciona para a página inicial ao clicar no link \'Home\'', () => {
    render(<MemoryRouter><App /></MemoryRouter>);

    const home = screen.getByRole('link', {
      name: /home/i,
    });

    userEvent.click(home);

    const homeTitle = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });

    expect(homeTitle).toBeInTheDocument();
  });

  test('Redireciona para a página sobre a Pokedéx ao clicar no link \'About\'', () => {
    render(<MemoryRouter><App /></MemoryRouter>);

    const about = screen.getByRole('link', {
      name: /about/i,
    });

    userEvent.click(about);

    const aboutTitle = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });

    expect(aboutTitle).toBeInTheDocument();
  });

  test('Redireciona para Favoritados ao clicar no link \'Favorite Pokémons\'', () => {
    render(<MemoryRouter><App /></MemoryRouter>);

    const favorite = screen.getByRole('link', {
      name: /favorite/i,
    });

    userEvent.click(favorite);

    const favoriteTitle = screen.getByRole('heading', {
      level: 2,
      name: /Favorite pokémons/i,
    });

    expect(favoriteTitle).toBeInTheDocument();
  });

  test('Redireciona para a página não encontrada', () => {
    const customHistory = createMemoryHistory();

    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    customHistory.push('/rota-nao-existente');

    const notFoundTitle = screen.getByRole('heading', {
      level: 2,
      name: /not found/i,
    });

    expect(notFoundTitle).toBeInTheDocument();
  });
});

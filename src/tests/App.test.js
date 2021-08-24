import React from 'react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import App from '../App';

describe('Test App.js', () => {
  test('Testando se a aplicação contém um conjunto fixo de links de navegação.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const home = screen.getByRole('link', {
      name: /home/i,
    });
    expect(home).toBeInTheDocument();

    const about = screen.getByRole('link', {
      name: /about/i,
    });
    expect(about).toBeInTheDocument();

    const favoritePokemon = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    expect(favoritePokemon).toBeInTheDocument();
  });

  test('Testando se a aplicação é redirecionada para a página inicial.', () => {
    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const home = screen.getByRole('link', {
      name: /home/i,
    });

    fireEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });

  test('Testando se a aplicação é redirecionada para a página About.', () => {
    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const about = screen.getByRole('link', {
      name: /about/i,
    });

    fireEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  });

  test('Testando se a aplicação é redirecionada para a página Favorite Pokémons.', () => {
    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const favoritePokemon = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });

    fireEvent.click(favoritePokemon);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Testando se a aplicação é redirecionada para a página Not Found.', () => {
    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    history.push('/digimon');

    const notFound = screen.getByRole('heading', {
      name: /not found/i,
    });

    expect(notFound).toBeInTheDocument();
  });
});

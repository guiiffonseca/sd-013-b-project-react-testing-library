import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('App.js tests', () => {
  test('Verifica se o topo da aplicação contém um conjunto de links de navegação', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: /Home/i,
    });
    userEvent.click(homeLink);

    const aboutLink = screen.getByRole('link', {
      name: /About/i,
    });
    userEvent.click(aboutLink);

    const favoritePokemonsLink = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    userEvent.click(favoritePokemonsLink);
  });

  test('Verifica o redirecionamento para a página Home', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');

    const homePageText = screen.getByRole('heading', {
      level: 1,
      name: /Pokédex/i,
    });

    expect(homePageText).toBeInTheDocument();
  });

  test('Verifica o redirecionamento para a página About', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const aboutPageText = screen.getByRole('heading', {
      level: 1,
      name: /Pokédex/i,
    });

    expect(aboutPageText).toBeInTheDocument();
  });

  test('Verifica o redirecionamento para a página Pokémons Favoritados', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const favoritePokemonsPageText = screen.getByRole('heading', {
      level: 1,
      name: /Pokédex/i,
    });

    expect(favoritePokemonsPageText).toBeInTheDocument();
  });

  test('Verifica se redireciona à página Not Found caso a URL seja desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const notFoundPageText = screen.getByRole('heading', {
      level: 1,
      name: /Pokédex/i,
    });

    expect(notFoundPageText).toBeInTheDocument();
  });
});

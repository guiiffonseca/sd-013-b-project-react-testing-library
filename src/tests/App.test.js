import React from 'react';
import { screen, render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

test('Verifica se a página contém link de Home, About e Favorite Pokémons', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const textHome = screen.getByRole('link', {
    name: /Home/i,
  });
  expect(textHome).toBeInTheDocument();

  const textAbout = screen.getByRole('link', {
    name: /About/i,
  });
  expect(textAbout).toBeInTheDocument();

  const textFavoritePokemons = screen.getByRole('link', {
    name: /Favorite Pokémons/i,
  });
  expect(textFavoritePokemons).toBeInTheDocument();
});

test('Verifica se clicar no link "Home" é direcionado para URL "/"', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const textHome = screen.getByRole('link', {
    name: /Home/i,
  });
  userEvent.click(textHome);

  const textHomePage = screen.getByRole('heading', {
    name: /Encountered pokémons/i,
  });
  expect(textHomePage).toBeInTheDocument();
});

test('Verifica se clicar no link "About" é direcionado para URL "/about"', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const textAbout = screen.getByRole('link', {
    name: /About/i,
  });
  userEvent.click(textAbout);

  const textAboutPage = screen.getByRole('heading', {
    name: /About Pokédex/i,
  });
  expect(textAboutPage).toBeInTheDocument();
});

test('Verifica se clicar no link "Favorite Pokémons" é direcionado para URL "/favorites"',
  () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const textFavoritePokemons = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    userEvent.click(textFavoritePokemons);

    const textFavoritePokemonsPage = screen.getByRole('heading', {
      name: /Favorite pokémons/i,
    });
    expect(textFavoritePokemonsPage).toBeInTheDocument();
  });

test('Verifica se ao entrar em URL desconhecida direciona para "Not Found"', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/rota-nao-existe');

  const pageNotFoundText = screen.getByRole('heading', {
    name: /not found/i,
  });
  expect(pageNotFoundText).toBeInTheDocument();
});

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  renderWithRouter(<App />);
  const homeLink = screen.getByRole('link', {
    name: 'Home',
  });
  const aboutLink = screen.getByRole('link', {
    name: 'About',
  });
  const favoritePokemonsLink = screen.getByRole('link', {
    name: 'Favorite Pokémons',
  });
  expect(homeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(favoritePokemonsLink).toBeInTheDocument();
});

test('se a aplicação é redirecionada para a página inicial, ao clicar em Home', () => {
  renderWithRouter(<App />);
  const homeLink = screen.getByRole('link', {
    name: 'Home',
  });

  userEvent.click(homeLink);

  const homeMainText = screen.getByRole('heading', {
    level: 2,
    name: 'Encountered pokémons',
  });
  expect(homeMainText).toBeInTheDocument();
});

test('se a aplicação é redirecionada para a página About, ao clicar  em About', () => {
  const { history } = renderWithRouter(<App />);
  const aboutLink = screen.getByRole('link', {
    name: 'About',
  });

  userEvent.click(aboutLink);

  const { pathname } = history.location;
  expect(pathname).toBe('/about');

  const aboutMainText = screen.getByRole('heading', {
    level: 2,
    name: 'About Pokédex',
  });
  expect(aboutMainText).toBeInTheDocument();
});

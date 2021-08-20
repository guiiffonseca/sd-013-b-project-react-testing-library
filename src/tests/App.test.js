import React from 'react';
import { fireEvent, screen } from '@testing-library/react';

import renderWithRouter from '../renderWithRouter';
import App from '../App';

// Requisito 1

test('if it renders a Home link', () => {
  renderWithRouter(<App />);

  const home = screen.getByText(/Home/);

  expect(home).toBeInTheDocument();
});

test('if it renders an About link', () => {
  renderWithRouter(<App />);

  const about = screen.getByText(/About/);

  expect(about).toBeInTheDocument();
});

test('if it renders a Favorite Pokémons link', () => {
  renderWithRouter(<App />);

  const favorite = screen.getByText(/Favorite Pokémons/);

  expect(favorite).toBeInTheDocument();
});

test('if the Home link leads to the Home Page', () => {
  const { history } = renderWithRouter(<App />);

  const home = screen.getByText(/Home/);

  fireEvent.click(home);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('if the About link leads to the About Page', () => {
  const { history } = renderWithRouter(<App />);

  const home = screen.getByText(/About/);

  fireEvent.click(home);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('if the Favorites link leads to the Favorite Pokémons Page', () => {
  const { history } = renderWithRouter(<App />);

  const home = screen.getByText(/Favorite Pokémons/);

  fireEvent.click(home);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('if there is a default NotFound Page', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/nada');

  const cryingEmoji = screen.getByLabelText('Crying emoji');
  expect(cryingEmoji).toBeInTheDocument();

  const sadPikachu = screen.getByAltText(
    'Pikachu crying because the page requested was not found',
  );
  expect(sadPikachu.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  expect(sadPikachu).toBeInTheDocument();
});

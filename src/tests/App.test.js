import React from 'react';
import { fireEvent } from '@testing-library/react';

import renderWithRouter from '../renderWithRouter';
import App from '../App';

// Requisito 1
// Tentando arrumar o bug no Lint
test('if it renders a Home link', () => {
  const { getByText } = renderWithRouter(<App />);

  const home = getByText(/Home/);

  expect(home).toBeInTheDocument();
});

test('if it renders an About link', () => {
  const { getByText } = renderWithRouter(<App />);

  const about = getByText(/About/);

  expect(about).toBeInTheDocument();
});

test('if it renders a Favorite Pokémons link', () => {
  const { getByText } = renderWithRouter(<App />);

  const favorite = getByText(/Favorite Pokémons/);

  expect(favorite).toBeInTheDocument();
});

test('if the Home link leads to the Home Page', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const home = getByText(/Home/);

  fireEvent.click(home);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('if the Home link leads to the About Page', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const home = getByText(/About/);

  fireEvent.click(home);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('if the Home link leads to the Favorite Pokémons Page', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const home = getByText(/Favorite Pokémons/);

  fireEvent.click(home);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('if the Home link leads to the NotFound Page', () => {
  const { getByLabelText, getByAltText, history } = renderWithRouter(<App />);

  history.push('/nada');

  const cryingEmoji = getByLabelText('Crying emoji');
  expect(cryingEmoji).toBeInTheDocument();

  const sadPikachu = getByAltText(
    'Pikachu crying because the page requested was not found',
  );
  expect(sadPikachu.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  expect(sadPikachu).toBeInTheDocument();
});

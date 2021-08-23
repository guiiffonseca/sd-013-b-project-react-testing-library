import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utility/renderWithRouter';

test('Verify if app has 3 links with Home, About and Favorite Pokémons texts', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const homeText = screen.getByText('Home');
  expect(homeText).toBeInTheDocument();

  const aboutText = screen.getByText('About');
  expect(aboutText).toBeInTheDocument();

  const favoritePokeText = screen.getByText('Favorite Pokémons');
  expect(favoritePokeText).toBeInTheDocument();
});

test('Verify if when Home link is clicked, the page will be redirected to "/"', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const homeText = screen.getByText('Home');
  userEvent.click(homeText);
  const textFromHome = screen.getByText(/Encountered pokémons/i);
  expect(textFromHome).toBeInTheDocument();
});

test('Verify if when About is clicked, the page will be redirected to "/about"', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const aboutText = screen.getByText('About');
  userEvent.click(aboutText);
  const textFromAbout = screen.getByText(/About Pokédex/i);
  expect(textFromAbout).toBeInTheDocument();
});

test('Verify if when Fav. Pokemon is clicked, will be redirected to "/favorites"', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const favoriteText = screen.getByText('About');
  userEvent.click(favoriteText);
  const textFromFavorite = screen.getByText(/Favorite pokémons/i);
  expect(textFromFavorite).toBeInTheDocument();
});

test('Verify if page will be redirectioned to "Not Found Page" with wrong URL', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/page-dont-exist/');

  const pageNotFound = screen.getByText(/Page requested not found/i);
  expect(pageNotFound).toBeInTheDocument();
});

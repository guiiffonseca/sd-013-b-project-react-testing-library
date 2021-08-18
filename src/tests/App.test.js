import React from 'react';
import { screen } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';

describe('Test of componnent <App /> ', () => {
  test('Verify if exists link Home and render page Home', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', {
      name: /Home/i,
    });
    userEvent.click(linkHome);
    const homePageText = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(homePageText).toBeInTheDocument();
  });

  test('Verify if exists link About and render page About', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', {
      name: /About/i,
    });
    userEvent.click(linkAbout);
    const aboutPageText = screen.getByText(/this application simulates/i);
    expect(aboutPageText).toBeInTheDocument();
  });

  test('Verify if exists link Favorites Pokémons and render page', () => {
    renderWithRouter(<App />);
    const linkFavorites = screen.getByRole('link', {
      name: /Favorite/i,
    });
    userEvent.click(linkFavorites);
    const favoritePageText = screen.getByRole('heading', {
      level: 2,
      name: /Favorite Pokémons/i,
    });
    expect(favoritePageText).toBeInTheDocument();
  });

  test('Verify if application render page NotFound if set route not exists', () => {
    const { history } = renderWithRouter(<App />);
    history.push('route-not-exists');
    const notFoundPageText = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(notFoundPageText).toBeInTheDocument();
  });
});

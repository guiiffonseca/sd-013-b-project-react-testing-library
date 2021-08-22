import React from 'react';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import App from '../App';

describe('App.js', () => {
  it('links must have the text Home, About, Favorite Pokemon ', () => {
    // Render the app in the virtual browser
    renderWithRouter(<App />);

    // Get the elements
    const [Home, About, FavoritePokemons] = screen.getAllByRole('link');

    // Test if they are in the document
    expect(Home).toBeInTheDocument();
    expect(About).toBeInTheDocument();
    expect(FavoritePokemons).toBeInTheDocument();

    // Test if they have an inner text
    expect(Home.innerHTML).toBe('Home');
    expect(About.innerHTML).toBe('About');
    expect(FavoritePokemons.innerHTML).toBe('Favorite Pokémons');
  });

  it('home link should redirect to /', () => {
    // Render the app and get the history inside of the Route
    const { history } = renderWithRouter(<App />);

    // Get the link
    const HomeLink = screen.getByText('Home');

    // Click the link
    userEvent.click(HomeLink);

    // Test if the pathname is correct
    expect(history.location.pathname).toBe('/');
  });

  it('about link should redirect to /about', () => {
    // Render the app and get the history inside of the Route
    const { history } = renderWithRouter(<App />);

    // Get the link
    const AboutLink = screen.getByText('About');

    // Click the link
    userEvent.click(AboutLink);

    // Test if the pathname is correct
    expect(history.location.pathname).toBe('/about');
  });

  it('favorite pokémons link should redirect to /favorites', () => {
    // Render the app and get the history inside of the Route
    const { history } = renderWithRouter(<App />);

    // Get the link
    const FavoritePokemonLink = screen.getByText('Favorite Pokémons');

    // Click the link
    userEvent.click(FavoritePokemonLink);

    // Test if the pathname is correct
    expect(history.location.pathname).toBe('/favorites');
  });

  it('unknow url should redirect to not found page', () => {
    // Render the app and get the history inside of the Route
    const { history } = renderWithRouter(<App />);

    // Get a random url
    history.push('/randomURL');

    // Get the not found element
    const NotFound = screen.getByText('Page requested not found');

    // Test if the pathname is correct
    expect(NotFound).toBeInTheDocument();
  });
});

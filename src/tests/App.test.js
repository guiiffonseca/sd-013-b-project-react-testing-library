import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './util/renderWithRouter';
import App from '../App';

describe('whether the top of the application contains a fixed set of links', () => {
  it('must have "Home" link and when clicking it takes you to the home page', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();

    userEvent.click(homeLink);
    const homeText = screen.getByRole('heading', { level: 2, name: /Encountered/ });
    expect(homeText).toBeInTheDocument();
  });

  it('must have "About" link and when clicking it takes you to the About page', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();

    userEvent.click(aboutLink);
    const aboutText = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(aboutText).toBeInTheDocument();
  });

  it('must have the "Favorite Pokémons" link and when clicking takes to the page', () => {
    renderWithRouter(<App />);
    const favoritePokemonsLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoritePokemonsLink).toBeInTheDocument();

    userEvent.click(favoritePokemonsLink);
    const favoriteText = screen.getByRole('heading', { level: 2, name: /Favorite/ });
    expect(favoriteText).toBeInTheDocument();
  });
});

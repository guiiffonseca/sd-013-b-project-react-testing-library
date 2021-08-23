import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testes do component <App.js />', () => {
  test('Se na aplicação existe um link para a página Home', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);
    const homeAfterClick = screen.getByText(/Encountered pokémons/i);
    expect(homeAfterClick).toBeInTheDocument();
  });

  test('Se na aplicação existe um link para a página About', () => {
    renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);
    const aboutAfterClick = screen.getByText(/About Pokédex/i);
    expect(aboutAfterClick).toBeInTheDocument();
  });

  test('Se na aplicação existe um link para a página Favorite Pokémons', () => {
    renderWithRouter(<App />);

    const favoritePokemonsLink = screen.getByRole('link', { name: /Favorite/i });
    expect(favoritePokemonsLink).toBeInTheDocument();
    userEvent.click(favoritePokemonsLink);
    const FavoritePokemonsAfterClick = screen.getByRole('heading', {
      level: 2,
      name: /Favorite Pokémons/i,
    });
    expect(FavoritePokemonsAfterClick).toBeInTheDocument();
  });
});

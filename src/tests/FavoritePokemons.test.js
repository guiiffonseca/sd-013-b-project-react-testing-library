import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testing component <FavoritePokemons.js />', () => {
  it('Testing if the person doesnt have favourites', () => {
    render(<Router><FavoritePokemons /></Router>);
    const message = screen.getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();
  });

  it('Test if the person dont have favourites', () => {
    render(<Router><App /></Router>);
    const details = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(details);

    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);

    const favorite = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(favorite);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './util/renderWithRouter';
import App from '../App';

describe('tests the component about and its elements', () => {
  beforeEach(() => renderWithRouter(<App />), 0);

  it('should have "No favorite pokemon found" text', () => {
    userEvent.click(screen.getByRole('link', { name: /Favorite Pokémon/ }));

    const notFoundText = screen.getByText('No favorite pokemon found');
    expect(notFoundText).toBeInTheDocument();
  });

  it('should have a favorite pokemon information', () => {
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    userEvent.click(screen.getByRole('link', { name: /Favorite Pokémon/ }));
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
  });
});

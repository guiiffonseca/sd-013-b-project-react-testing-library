import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa pokemons favoritados', () => {
  test('Testa se é exibida a mensagem No favorite pokemon found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const msg = screen.getByText(/No favorite pokemon found/i);
    expect(msg).toBeInTheDocument();
  });
});

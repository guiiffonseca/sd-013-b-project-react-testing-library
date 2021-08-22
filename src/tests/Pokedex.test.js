import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './router/renderWithRouter';
import App from '../App';

describe('Testa componente Pokedex', () => {
  test('verifica se a página possui Encountered pokémons', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('heading', {
      name: /Encountered pokémons/,
    }));
  });
});

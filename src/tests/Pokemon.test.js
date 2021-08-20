import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste do componente Pokemon', () => {
  test(' Teste se é renderizado um card com as info de pokémon.', () => {
    renderWithRouter(<App />);
    const Pikachu = screen.getByText(/Pikachu/i);
    const PikachuWeight = screen.getByText(/Average weight:/i);
    // const image = screen.getByRole('img');
    // expect(image).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(Pikachu).toBeInTheDocument();
    expect(PikachuWeight).toBeInTheDocument();
  });
});

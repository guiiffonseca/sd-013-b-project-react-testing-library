import { screen } from '@testing-library/react';
import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testa o About.js', () => {
  test('Teste se a página contém informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    let textAbout = screen.getByText(/About Pokédex/i);
    expect(textAbout).toBeInTheDocument();

    textAbout = screen.getByRole('heading', {
      level: 2,
    });
    expect(textAbout).toBeInTheDocument();

    const elementP = screen.getAllByTestId('p-element');
    expect(elementP.length).toBe(2);

    const elementImg = screen.getByRole('img');
    expect(elementImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

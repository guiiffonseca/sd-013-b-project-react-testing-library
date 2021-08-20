import { screen } from '@testing-library/react';
import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testa o About.js', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });

  test('Teste se a página contém informações sobre a Pokédex', () => {
    const textAbout = screen.getByText(/About Pokédex/i);
    expect(textAbout).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const textAbout = screen.getByRole('heading', {
      level: 2,
    });
    expect(textAbout).toBeInTheDocument();
    expect(textAbout).toHaveTextContent('About Pokédex');
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const elementP = screen.getAllByTestId('p-element');
    expect(elementP.length).toBe(2);
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    const elementImg = screen.getByRole('img');
    expect(elementImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

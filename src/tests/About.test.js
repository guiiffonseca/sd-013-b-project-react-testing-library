import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('testa o componente About', () => {
  test('teste se a pagina contem um h2 com o texto About Pokedex', () => {
    render(<About />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(heading).toBeInTheDocument();
  });
  test('teste se a pagina contem 2 p com o texto sobre a Pokedex', () => {
    render(<About />);

    const firstParagraph = screen.getByText(/This application simulates a Pokédex/);
    const secondParagraph = screen.getByText(/One can filter Pokémons by type/);

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });
  test('teste se a pagina contem a imagem de uma Pokedex', () => {
    render(<About />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

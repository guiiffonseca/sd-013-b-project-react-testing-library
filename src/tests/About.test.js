import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testa implementações do About.js', () => {
  test('Testa se a página contem informações em um h2', () => {
    render(<About />);
    const about = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(about).toBeInTheDocument();
  });
  test('Testa se a página contém dois p com texto', () => {
    render(<About />);
    const firstP = screen.getByText(/This application simulates a Pokédex/i);
    const secondP = screen.getByText(/One can filter Pokémons by typer/i);
    expect(firstP).toBeInTheDocument();
    expect(secondP).toBeInTheDocument();
  });
  test('Testa se contem imagem', () => {
    render(<About />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('testando o componente About', () => {
  test('se existe um h2', () => {
    render(<About />);
    const title = screen.getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });
    expect(title).toBeInTheDocument();
  });
  test('se existe um parágrafo', () => {
    render(<About />);
    const paragraph1 = screen.getByText(
      'This application simulates a Pokédex,'
    + ' a digital encyclopedia containing all Pokémons',
    );
    expect(paragraph1).toBeInTheDocument();
  });
  test('se existe outro parágrafo', () => {
    render(<About />);
    const paragraph2 = screen.getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );
    expect(paragraph2).toBeInTheDocument();
  });
  test('se existe uma imagem', () => {
    render(<About />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

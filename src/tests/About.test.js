import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

describe('Testa o componente About.js', () => {
  beforeEach(() => {
    render(<About />);
  });

  test('Deve conter o título \'About Pokémon\'', () => {
    const title = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });

    expect(title).toBeInTheDocument();
  });

  test('Deve conter dois parágrafos com texto sobre a Pokédex', () => {
    const paragraphs = screen.getAllByText(/Pokémons/i);

    expect(paragraphs).toHaveLength(2);
  });

  test('Deve conter a imagem de uma Pokédex', () => {
    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

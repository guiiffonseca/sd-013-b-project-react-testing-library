import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import { About } from '../components';

describe('Teste o componente <About.js />', () => {
  test('Verifica se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);

    const aboutPokedexText = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });

    expect(aboutPokedexText).toBeInTheDocument();
  });
  test('Verifica se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const aboutPokedexParagraph = screen.getAllByText(/Pokémons/i);
    expect(aboutPokedexParagraph).toHaveLength(2);
  });

  test('Verifica se a página contém uma imagem.', () => {
    renderWithRouter(<About />);

    const aboutPokedexIMG = screen.getByRole('img');

    expect(aboutPokedexIMG).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

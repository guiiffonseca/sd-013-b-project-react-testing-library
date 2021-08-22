import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';

import About from '../components/About';

describe('Testando componentes da tela About', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });

  it('testa se existe o texto h2 com texto "about Pokédex" ', () => {
    const mainTextPage = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });

    expect(mainTextPage).toBeInTheDocument();
  });

  it('Testa se a página contem informações sobre a pokedex', () => {
    const image = screen.getByRole('img', {
      name: /Pokédex/i,
    });

    expect(image).toBeInTheDocument();
  });

  it('Testa se a páginacontem 2 paragrafos com texto sobre a pokédex', () => {
    const haveParagraphs = screen.getAllByText(/pokémon/i);

    expect(haveParagraphs).toHaveLength(2);
    haveParagraphs.forEach((paragraph) => {
      expect(paragraph).toBeInTheDocument();
    });
  });

  it('Testa se a imagem "https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png" aparece na tela', () => {
    const haveImage = screen.getByAltText(/Pokédex/i);

    expect(haveImage).toBeInTheDocument();
    expect(haveImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from './utils/renderWithRouter';
import { About } from '../components';

describe('Teste componente About', () => {
  it('Verifica se a página contém informações sobre a Pokédex', () => {
    const { history } = renderWithRouter(<About />);
    history.push('/about');

    const pageAboutText = screen.getByText(/This application simulates a Pokédex/i);
    expect(pageAboutText).toBeInTheDocument();
  });

  it('Verifica se a págian contém o texto "About Pokédex"', () => {
    const { history } = renderWithRouter(<About />);
    history.push('/about');

    const pageTextAboutPokedex = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(pageTextAboutPokedex).toBeInTheDocument();
  });

  it('Verifica se a page contém 2 parágrafos com texto sobre Pokédex', () => {
    const { history } = renderWithRouter(<About />);
    history.push('/about');

    const textParagraphOne = /This application simulates a Pokédex/i;
    const textParagraphTwo = /One can filter Pokémons by type/i;

    const pageParagraphTextOne = screen.getByText(textParagraphOne);
    expect(pageParagraphTextOne).toBeInTheDocument();
    const pageParagraphTextTwo = screen.getByText(textParagraphTwo);
    expect(pageParagraphTextTwo).toBeInTheDocument();
  });

  it('Verifica se a página contém a imagem de uma Pokédex', () => {
    const imgURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const { history } = renderWithRouter(<About />);
    history.push('/about');

    const pageAboutImage = screen.getByRole('img');
    expect(pageAboutImage).toHaveAttribute('src', imgURL);
  });
});

import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/helper';
import About from '../components/About';

describe('Teste o componente About', () => {
  test('Se a página contém as informações sobre a Pokédex', () => {
    const { history } = renderWithRouter(<About />);
    history.push('/about');
    const pokeData = screen.getByText(/One can filter Pokémons/i);
    expect(pokeData).toBeInTheDocument();
  });

  test('Se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { history } = renderWithRouter(<About />);
    history.push('/about');
    const aboutHeading = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(aboutHeading).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { history } = renderWithRouter(<About />);
    history.push('/about');
    const aboutParagraphOne = screen.getByText(/This application/i);
    const aboutParagraphTwo = screen.getByText(/One can filter/i);
    expect(aboutParagraphOne).toBeInTheDocument();
    expect(aboutParagraphTwo).toBeInTheDocument();
  });

  test('Teste se a página contém a imagem de uma Pokédex', () => {
    const { history } = renderWithRouter(<About />);
    history.push('/about');
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const aboutImage = screen.getByRole('img');
    expect(aboutImage).toHaveAttribute('src', src);
    expect(aboutImage).toBeInTheDocument();
  });
});

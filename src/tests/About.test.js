import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Requisito 2', () => {
  beforeEach(() => {
    render(<About />);
  });

  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    const firstParagraphText = 'This application simulates a Pokédex,'
    + ' a digital encyclopedia containing all Pokémons';
    const firstParagraph = screen.getByText(firstParagraphText);
    const secondParagraphText = 'One can filter Pokémons by type,'
    + ' and see more details for each one of them';
    const secondParagraph = screen.getByText(secondParagraphText);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const headerAbout = screen.getByRole('heading', { level: 2 });
    expect(headerAbout).toHaveTextContent('About Pokédex');
  });

  test('Teste se a página contém uma imagem ', () => {
    const pokeImage = screen.getByRole('img');
    const expectedImage = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(pokeImage.src).toBe(expectedImage);
  });
});

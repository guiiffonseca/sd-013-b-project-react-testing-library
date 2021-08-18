import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Teste o componente <About.js />.', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    render(<About />);
    const infoText = screen.getByText(/One can filter Pokémons by type/);
    expect(infoText).toBeInTheDocument();
  });

  it('se contém um heading h2 com o texto About Pokédex.', () => {
    render(<About />);
    const aboutPokedex = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(aboutPokedex).toBeInTheDocument();
  });

  it('se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(<About />);
    const number = 2;
    const sholdParagraph = screen.getAllByTestId('paragraph');
    expect(sholdParagraph).toHaveLength(number);
  });

  it('se a página contém a seguinte imagem de uma Pokédex', () => {
    render(<About />);
    const imgUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = screen.getByAltText('Pokédex');
    expect(image).toHaveAttribute('src', imgUrl);
  });
});

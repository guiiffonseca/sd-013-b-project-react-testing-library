import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testando o componente About', () => {
  test('Se a página contém informações sobre a Pokédex', () => {
    const { history } = renderWithRouter(<About />);
    history.push('/about');
    const aboutPokedex = screen.getByText(/About Pokédex/i);

    expect(aboutPokedex).toBeInTheDocument();
  });
  test('Se a página possui um h2 com o texto About Pokédex', () => {
    const { history } = renderWithRouter(<About />);
    history.push('/about');
    const aboutPokedex = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(aboutPokedex).toBeInTheDocument();
  });
  test('Se possui dois parágrafos sobre a Pokédex', () => {
    const { history } = renderWithRouter(<About />);
    history.push('/about');
    const paragraph = screen.getAllByText(/Pokémons/i);
    expect(paragraph.length).toBe(2);
  });
  test('Se a página possui imagem da Pokédex', () => {
    const { history } = renderWithRouter(<About />);
    history.push('/about');
    const img = screen.getByAltText(/Pokédex/i);
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../Uteis/renderWithRouter';
import About from '../components/About';

// Recebi ajuda do Gênesis Henriques, Matheus Figueiredo, Gabriel Ribeiro e Gustavo Alves para desenvolver esse projeto https://github.com/GenesisHenriques, https://github.com/mathfigueiredo, https://github.com/Gribeir0, https://github.com/gustavoalves23

describe('Testa o componente About ', () => {
  it('Testa o título H2', () => {
    renderWithRouter(<About />);
    const textH2 = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(textH2).toBeDefined();
  });

  it('Testa se os paragrafos são sobre a pokédex', () => {
    renderWithRouter(<About />);
    const textP = screen.getAllByText(/pokémons/i);
    expect(textP.length).toBe(2);
  });

  it('Testa se a imagem da pokédex', () => {
    renderWithRouter(<About />);
    const imgPokedex = screen.getByRole('img', { src: 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png' });
    expect(imgPokedex.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

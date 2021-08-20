import React from 'react';
import { screen } from '@testing-library/react';
import RouterMemory from './RouterMemory';
import About from '../components/About';

describe('Requisito 2', () => {
  test('se a página contém as informações sobre a Pokédex', () => {
    RouterMemory(<About />);

    const pokedexInfo = screen.getByText(/digital encyclopedia/);

    expect(pokedexInfo).toBeInTheDocument();
  });

  test('se a página contém um heading h2 com o texto About Pokédex', () => {
    RouterMemory(<About />);

    const header = screen.getByRole('heading', { level: 2 });

    expect(header.textContent).toBe('About Pokédex');
  });

  test('se a página contém uma imagem de uma Pokédex', () => {
    RouterMemory(<About />);

    const image = screen.getByAltText('Pokédex');

    expect(image.src).toBe(
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});

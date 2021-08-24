import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { About } from '../components';

describe('Test About.js', () => {
  test('Testando se a página contém as informações sobre a Pokédex', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const pokedexInfo = screen.getByText(/simulates a pokédex/i);
    expect(pokedexInfo).toBeInTheDocument();
  });

  test('Testando se a página contém um heading h2 com o texto About Pokédex', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const aboutHeading = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(aboutHeading).toBeInTheDocument();
  });

  test('Testando se a página contém 2 parágrafos com texto sobre a Pokédex', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const firstParagraph = screen.getByText(/this application/i);
    expect(firstParagraph).toBeInTheDocument();

    const secondParagraph = screen.getByText(/one can filter/i);
    expect(secondParagraph).toBeInTheDocument();
  });

  // solução usada de base para teste de imagem:
  // https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
  test('Testando se a página contém a imagem de uma Pokédex', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const pokedexImage = screen.getByAltText('Pokédex');
    expect(pokedexImage.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

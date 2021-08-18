import React from 'react';
import { screen, render } from '@testing-library/react';

import { MemoryRouter } from 'react-router';
import About from '../components/About';

describe('Teste o componente <About.js />.', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const infoPokedexPage = screen.getByRole('heading', {
      level: 2,
      name: /about/i,
    });
    expect(infoPokedexPage).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const h2InfoPokedex = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(h2InfoPokedex).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const p1InfoPokedex = screen.getByText(/application simulates/i);
    expect(p1InfoPokedex).toBeInTheDocument();

    const p2InfoPokedex = screen.getByText(/and see more details/i);
    expect(p2InfoPokedex).toBeInTheDocument();
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    // https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
    const imagePokedex = screen.getByRole('img');
    expect(imagePokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

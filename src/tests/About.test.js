import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import About from '../components/About';

describe('Testa se a página contém informações sobre a pokédex', () => {
  test('verifica se a página contém um heading com o texto About Pokédex', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /About Pokédex/,
      }),
    ).toBeInTheDocument();
  });

  test('verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    expect(
      screen.getByText(
        /This application simulates a Pokédex,/,
        /a digital encyclopedia containing all Pokémons/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /One can filter Pokémons by type, and see more details for each one of them/,
      ),
    ).toBeInTheDocument();
  });

  test('verifica se a página contém a imagem do Pokédex', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('img'),
    ).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(screen.getByAltText('Pokédex')).toBeInTheDocument();
  });
});

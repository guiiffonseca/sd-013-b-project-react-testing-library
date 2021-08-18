import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Requisito 2', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const about = screen.getByText(/About Pokédex/i);
    expect(about).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const aboutH2 = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });

    expect(aboutH2).toBeInTheDocument();
  });

  test('Teste se a página tem dois parágrafos com texto sobre a Pokédex', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const about1P = screen.getByText(/This application simulates a Pokédex/i);
    const about2p = screen.getByText(/One can filter Pokémons by type/i);

    expect(about1P).toBeInTheDocument();
    expect(about2p).toBeInTheDocument();
  });

  test('Teste se a página contém uma IMG', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const img = screen.getByRole('img');

    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

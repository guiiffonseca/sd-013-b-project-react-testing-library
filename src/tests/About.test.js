import React from 'react';
import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import { About } from '../components';

describe('Testando o componente <About.js />', () => {
  test('Testa se existe um h2 com o texto "About Pokédex" ', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const aboutTitle = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });

    expect(aboutTitle).toBeInTheDocument();
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const srcImage = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const altImage = 'Pokédex';
    const imgPokedex = screen.getByRole('img');

    expect(imgPokedex).toHaveAttribute('src', srcImage);
    expect(imgPokedex).toHaveAttribute('alt', altImage);
  });
});

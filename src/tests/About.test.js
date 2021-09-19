import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { About } from '../components';
// import userEvent from '@testing-library/user-event';
// import renderWithRouter from '../services/renderWithRouter';

describe('<About.js /> Integration Tests:', () => {
  test('1) Se a página contém um heading "h2" com o texto "About Pokédex".',
    () => {
      render(<MemoryRouter><About /></MemoryRouter>);

      const headingText = screen.getByRole('heading', {
        level: 2,
        name: 'About Pokédex',
      });

      expect(headingText).toBeInTheDocument();
    });

  test('2) Se a página contém dois parágrafos com texto sobre a Pokédex.',
    () => {
      render(<MemoryRouter><About /></MemoryRouter>);

      const firstParagraphText = screen.getByText(
        'This application simulates a Pokédex, a digital '
        + 'encyclopedia containing all Pokémons',
      );
      const secondParagraphText = screen.getByText(
        'One can filter Pokémons by type, and see more details for each one of them',
      );

      expect(firstParagraphText).toBeInTheDocument();
      expect(secondParagraphText).toBeInTheDocument();
    });

  test('3) Se a página contém a seguinte imagem de uma Pokédex: "https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png".',
    () => {
      render(<MemoryRouter><About /></MemoryRouter>);

      const imagePokedex = screen.getByRole('img');

      expect(imagePokedex).toBeInTheDocument();
      expect(imagePokedex.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    });
});

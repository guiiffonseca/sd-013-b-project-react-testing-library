import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import About from '../components/About';

describe('About.js tests.', () => {
  it(`Ao entrar na página verifica contém um 
  heading h2 com o texto About Pokédex.`, () => {
    renderWithRouter(<About />);

    const AboutPokedexText = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(AboutPokedexText).toBeInTheDocument();
  });

  it(`Ao entrar na página verifica se a página contém 
  dois parágrafos com texto sobre a Pokédex`, () => {
    renderWithRouter(<About />);

    const infoPokedexTextP1 = screen.getByText(/This application simulates a Pokédex/);
    const infoPokedexTextP2 = screen.getByText(/see more details for each one of them/);

    expect(infoPokedexTextP1).toBeInTheDocument();
    expect(infoPokedexTextP2).toBeInTheDocument();
  });

  it('Ao entrar na página verifica se a página contém a imagem de uma Pokédex.', () => {
    renderWithRouter(<About />);
    /* referência: https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f */

    const Url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imgPokedex = screen.getByRole('img');

    expect(imgPokedex).toHaveAttribute('src', Url);
  });
});

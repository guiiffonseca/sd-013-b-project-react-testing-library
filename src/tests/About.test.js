import React from 'react';
import { screen } from '@testing-library/react';

import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste About ', () => {
  test('Existe um Heading level 2', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/about');

    const AboutPokedex = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(AboutPokedex).toBeInTheDocument();
  });

  test('Existe 2 paragrafos?', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const ParaPokedex = screen.getByText(/This application simulates a /);
    const SecondParaPokedex = screen.getByText(/One can filter Pokémons/);
    expect(ParaPokedex).toBeInTheDocument();
    expect(SecondParaPokedex).toBeInTheDocument();
  });

  test('Existe uma imagem ?', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const pokeImage = screen.getByRole('img');

    expect(pokeImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

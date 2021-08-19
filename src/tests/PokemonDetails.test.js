import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { screen, render } from '@testing-library/react';
import App from '../App';

describe('Requisito 7', () => {
  test('Teste se as informações About Pokemon aparecem na tela', () => {
    render(
      <MemoryRouter initialEntries={ ['/pokemons/4'] }>
        <App />
      </MemoryRouter>,
    );

    const game = screen.getByText(/Game Locations of Charmander/i);
    expect(game).toBeInTheDocument();

    const map = screen.getAllByAltText(/Charmander location/i);
    expect(map[0]).toBeInTheDocument();
    expect(map[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png');

    const detailsPokemon = screen.getByText(/Charmander Details/i);
    expect(detailsPokemon).toBeInTheDocument();

    const paragraph = screen.getByText(/The flame on its tail shows /i);
    expect(paragraph).toBeInTheDocument();

    const sumary = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(sumary).toBeInTheDocument();

    const favorite = screen.getByText(/favoritado/i);
    expect(favorite).toBeInTheDocument();
  });
});

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('PokemonDetails funciona corretamente', () => {
  it('Exibe informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByText(/more details/i);

    const pikachu = 'Pikachu';

    userEvent.click(moreDetailsLink);
    const pikachuDetails = screen
      .getByRole('heading', { name: `${pikachu} Details`, level: 2 });

    expect(pikachuDetails).toBeInTheDocument();
    expect(moreDetailsLink).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(summary).toBeInTheDocument();

    const pokeDetails = screen.getByText(/with electricity to make them tender enough/);
    expect(pokeDetails).toBeInTheDocument();
  });

  it('Página contém seção com os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByText(/more details/i);
    const poke = 'Pikachu';

    userEvent.click(moreDetailsLink);
    const gameLocations = screen
      .getByRole('heading', { name: `Game Locations of ${poke}`, level: 2 });

    expect(gameLocations).toBeInTheDocument();

    const pokePlacesFounded = screen.getByText('Kanto Power Plant');
    const maps = screen.getAllByRole('img', { name: `${poke} location` });

    expect(maps.length).toBe(2);
    expect(pokePlacesFounded).toBeInTheDocument();
    expect(maps[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('', () => {});
});

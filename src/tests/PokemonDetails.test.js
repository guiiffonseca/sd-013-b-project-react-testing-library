import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('', () => {
  test('Detalhes do pikachu', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const PikachuDetails = screen.getByRole('heading', {
      level: 2,
      name: /Pikachu Details/i,
    });
    const PikachuName = screen.getByTestId('pokemon-name');
    const PikachuType = screen.getByTestId('pokemon-type');
    const PikachuWeight = screen.getByTestId('pokemon-weight');
    const PikachuImage = screen.getByAltText('Pikachu sprite');

    expect(PikachuDetails).toBeInTheDocument();
    expect(PikachuName).toHaveTextContent('Pikachu');
    expect(PikachuType).toHaveTextContent('Electric');
    expect(PikachuWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(PikachuImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Localização do pikachu', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const SummaryParaph = screen.getByText(/This intelligent Pokémon/i);
    const summary = screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    });
    expect(summary).toHaveTextContent('Summary');
    expect(SummaryParaph).toBeInTheDocument();

    const PikachuLocation = screen.getByRole('heading', {
      level: 2,
      name: /Game Locations of Pikachu/i,
    });
    expect(PikachuLocation).toBeInTheDocument();

    const ImagePikachuLocation = screen.getAllByAltText(
      'Pikachu location',
    );
    expect(ImagePikachuLocation[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(ImagePikachuLocation[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    const FavoritarPokemon = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(FavoritarPokemon);
    expect(FavoritarPokemon).toBeInTheDocument();
  });
});

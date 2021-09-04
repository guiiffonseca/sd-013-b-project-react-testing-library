import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../routes/router';
import pokemons from '../data';

import PokemonDetails from '../components/PokemonDetails';
import Pokemon from '../components/Pokemon';
import App from '../App';

const match = {
  isExact: true,
  path: '/pokemons/:id',
  url: '/pokemons/23',
  params: {
    id: '23',
  },
};

describe('As informações do Pokémon são mostradas na tela', () => {
  test('A página deve conter um texto <name> Details.', () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      match={ match }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => ('zero') }
    />);
    const detailsTitle = screen.getAllByRole('heading', {
      level: 2,
    })[0];
    expect(detailsTitle.innerHTML).toBe('Ekans Details');
  });

  test('Não deve existir o link de navegação para os detalhes do Pokémon.', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemons[3] }
      isFavorite
      showDetailsLink={ false }
    />);
    const detailsLink = screen.queryByText('More details');
    expect(detailsLink).not.toBeInTheDocument();
  });

  test('A seção de detalhes deve conter um h2 com o texto Summary.', () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      match={ match }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => ('zero') }
    />);
    const detailsSummary = screen.getAllByRole('heading', {
      level: 2,
    })[1];
    expect(detailsSummary.innerHTML).toBe('Summary');
  });

  test('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon.', () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      match={ match }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => ('zero') }
    />);
    const text1 = 'It can freely detach its jaw';
    const text2 = 'to swallow large prey whole.';
    const text3 = 'It can become too heavy to move, however.';
    const text = screen.getByText(`${text1} ${text2} ${text3}`);
    expect(text.innerHTML).toContain('It can freely detach its jaw');
  });
});

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

const match2 = {
  isExact: true,
  path: '/pokemons/:id',
  url: '/pokemons/25',
  params: {
    id: '25',
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

describe('Existe uma seção com os mapas contendo as localizações do pokémon', () => {
  test('Existe um h2 com o texto Game Locations of <name>', () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      match={ match }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => ('zero') }
    />);
    const locationTitle = screen.getAllByRole('heading', {
      level: 2,
    })[2];
    expect(locationTitle).toBeInTheDocument();
    expect(locationTitle.innerHTML).toBe('Game Locations of Ekans');
  });

  test('Todas as localizações do Pokémon devem ser mostradas', () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      match={ match2 }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => ('zero') }
    />);
    const locationList = screen.getAllByAltText('Pikachu location');
    const location0 = locationList[0];
    const location1 = locationList[1];
    expect(location0).toBeInTheDocument();
    expect(location1).toBeInTheDocument();
    expect(location1.alt).toBe('Pikachu location');
  });

  const description1 = 'Devem ser exibidos, o nome da localização';
  const description2 = 'e uma imagem do mapa em cada localização';

  test(`${description1} ${description2}`, () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      match={ match2 }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => ('zero') }
    />);
    const bulbAddress = 'https://cdn2.bulbagarden.net/upload';
    const location1 = screen.getByText(/kanto viridian forest/i);
    const location2 = screen.getByText(/kanto power plant/i);
    const image1 = screen.getAllByRole('img')[1];
    const image2 = screen.getAllByRole('img')[2];
    expect(image1.src).toBe(`${bulbAddress}/0/08/Kanto_Route_2_Map.png`);
    expect(image2.src).toBe(`${bulbAddress}/b/bd/Kanto_Celadon_City_Map.png`);
    expect(location1.innerHTML).toContain('Kanto Viridian Forest');
    expect(location2.innerHTML).toContain('Kanto Power Plant');
  });
});

describe('O pokémon pode ser favoritado na página de detalhes.', () => {
  test('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      match={ match }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => ('zero') }
    />);
    const favoritedCheck = screen.getByLabelText('Pokémon favoritado?');
    expect(favoritedCheck).toBeInTheDocument();
  });
});

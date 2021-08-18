import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';

describe('Testa o componente Pokemon.js', () => {
  const pokemon = {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
  };
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);
    const namePokemon = screen.getByTestId('pokemon-name');
    const typePokemon = screen.getByTestId('pokemon-type');
    const weigthPokemon = screen.getByTestId('pokemon-weight');
    expect(namePokemon).toBeInTheDocument();
    expect(typePokemon).toBeInTheDocument();
    expect(namePokemon.textContent).toBe('Pikachu');
    expect(typePokemon.textContent).toBe('Electric');
    expect(weigthPokemon.textContent).toBe('Average weight: 6.0 kg');
    const pokemonIMG = screen.getByAltText(`${pokemon.name} sprite`);
    expect(pokemonIMG.alt).toBe('Pikachu sprite');
    expect(pokemonIMG.src).toBe(pokemon.image);
  });
  test('testa se ao clicar em "More Details" ele vai para rota correta', () => {
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ false }
      />,
    );
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemon.id}`);
  });
  const boleano = true;
  test('Testa se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ boleano } />);
    const altIMG = `${pokemon.name} is marked as favorite`;
    const img = screen.getByAltText(altIMG);
    expect(img.src).toBe('http://localhost/star-icon.svg');
    expect(img.alt).toBe(altIMG);
  });
});

import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import Pokemon from '../components/Pokemon';

describe('Testa o componente Pokemon', () => {
  const poke = {
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

  it('Renderiza o Card com as informacoes do pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ poke } />);

    const name = screen.getByText('Pikachu');
    const type = screen.getByText('Electric');
    const weight = screen.getByText(/Average weight: 6.0 kg/);
    const image = screen.getByAltText('Pikachu sprite');

    expect(name).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(weight).toBeInTheDocument();
    expect(image.src).toContain(`${poke.image}`);
    expect(image).toBeInTheDocument();
  });

  it('Testa se contém link para navegacao', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ poke } />);

    const moreDetailsLink = screen.getByText(/More Details/i);

    fireEvent.click(moreDetailsLink);

    expect(history.location.pathname).toBe(`/pokemons/${poke.id}`);
  });

  it('Testa se contém imagem e selecionado favoritado', () => {
    renderWithRouter(<Pokemon
      pokemon={ poke }
      isFavorite="true"
    />);

    const favoritedImg = screen.getByAltText(`${poke.name} is marked as favorite`);
    expect(favoritedImg.src).toContain('/star-icon.svg');
  });
});

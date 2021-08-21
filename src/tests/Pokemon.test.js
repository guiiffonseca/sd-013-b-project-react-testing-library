import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import { Pokemon } from '../components';
import renderWithRouter from '../renderWithRouter';

const pikachu = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo:
    'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
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
  summary:
    'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
};

describe('Testando a componente Pokemon', () => {
  it('Um card com todas as informações do pokemon é renderizado', () => {
    renderWithRouter(
      <Pokemon pokemon={ pikachu } isFavorite={ false } showDetailsLink={ false } />,
    );
    const name = screen.getByText('Pikachu');
    expect(name).toBeInTheDocument();
    const type = screen.getByText('Electric');
    expect(type).toBeInTheDocument();
    const weight = screen.getByText('Average weight: 6.0 kg');
    expect(weight).toBeInTheDocument();
    const image = screen.getByAltText('Pikachu sprite');
    expect(image).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
  });

  it('O link ', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByText('More details');
    expect(link).toHaveAttribute('href', '/pokemons/25');
    fireEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Uma estrela deve aparecer nos pokémons favoritos', () => {
    renderWithRouter(
      <Pokemon pokemon={ pikachu } isFavorite showDetailsLink={ false } />,
    );
    const star = screen.getByAltText('Pikachu is marked as favorite');
    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });
});

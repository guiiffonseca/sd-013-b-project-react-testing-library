import React from 'react';
import { render, screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../utils/renderWithRouter';

describe('Testes da tela FavoritePokemons', () => {
  it('Test no favorite found', () => {
    render(
      <FavoritePokemons />,
    );
    const text = screen.getByText('No favorite pokemon found');
    expect(text).toBeInTheDocument();
  });
  it('Test favorite pokémons', () => {
    const mockPokemons = [
      {
        id: 65,
        name: 'Alakazam',
        type: 'Psychic',
        averageWeight: {
          value: '48.0',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Alakazam_(Pok%C3%A9mon)',
        foundAt: [
          {
            location: 'Unova Accumula Town',
            map: 'https://cdn2.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png',
          },
        ],
        summary: 'Closing both its eyes heightens all its other senses.'
          + 'This enables it to use its abilities to their extremes.',
      },
      {
        id: 148,
        name: 'Dragonair',
        type: 'Dragon',
        averageWeight: {
          value: '16.5',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Dragonair_(Pok%C3%A9mon)',
        foundAt: [
          {
            location: 'Johto Route 45',
            map: 'https://cdn2.bulbagarden.net/upload/2/21/Johto_Route_45_Map.png',
          },
          {
            location: 'Johto Dragon\'s Den',
            map: 'https://cdn2.bulbagarden.net/upload/1/1e/Johto_Dragons_Den_Map.png',
          },
        ],
        summary: 'They say that if it emits an aura from its whole body,'
          + 'the weather will begin to change instantly.',
      },
    ];
    renderWithRouter(<FavoritePokemons pokemons={ mockPokemons } />);
    const Alakazam = screen.getByRole('img', {
      name: 'Alakazam is marked as favorite',
    });
    const Dragonair = screen.getByRole('img', {
      name: 'Dragonair is marked as favorite',
    });
    expect(Alakazam && Dragonair).toBeInTheDocument();
  });
});

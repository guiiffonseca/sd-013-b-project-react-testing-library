import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';

const pikachuProps = { id: 25, name: 'Pikachu', type: 'Electric', averageWeight: { value: '6.0', measurementUnit: 'kg' }, image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png', moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)', foundAt: [{ location: 'Kanto Viridian Forest', map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png' }, { location: 'Kanto Power Plant', map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png' }], summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.' };

describe('Teste o componente <Pokemon.js />', () => {
  const testLabel1 = 'Teste se é renderizado um card'
  + 'com as informações de determinado pokémon';
  describe(testLabel1, () => {
    test('O nome correto do Pokémon deve ser mostrado na tela', () => {
      renderWithRouter(<Pokemon pokemon={ pikachuProps } />);
      expect(screen.getByTestId('pokemon-name').textContent)
        .toBe('Pikachu');
    });
    test('O tipo correto do pokémon deve ser mostrado na tela.', () => {
      renderWithRouter(<Pokemon pokemon={ pikachuProps } />);
      expect(screen.getByTestId('pokemon-type').textContent)
        .toBe('Electric');
    });
    test('O peso médio do pokémon deve ser exibido', () => {
      renderWithRouter(<Pokemon pokemon={ pikachuProps } />);
      expect(screen.getByTestId('pokemon-weight').textContent)
        .toBe('Average weight: 6.0 kg');
    });
    test('A imagem do Pokémon deve ser exibida.', () => {
      renderWithRouter(<Pokemon pokemon={ pikachuProps } />);
      const img = screen.getByAltText('Pikachu sprite');
      expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    });
  });
  const testLabel2 = 'Teste se o card do Pokémon indicado na'
  + 'Pokédex contém um link de navegação para exibir detalhes deste Pokémon.';
  test(testLabel2, () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pikachuProps } />);
    const detailsButton = screen.getByRole('link');
    expect(detailsButton).toBeInTheDocument();
    fireEvent.click(detailsButton);
    expect(history.entries[history.entries.length - 1].pathname)
      .toBe('/pokemons/25');
  });

  describe('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    test('O ícone deve ser uma imagem com o atributo src contendo o caminho', () => {
      renderWithRouter(<Pokemon pokemon={ pikachuProps } isFavorite />);
      const starImg = screen.getByAltText('Pikachu is marked as favorite');
      expect(starImg).toBeInTheDocument();
      expect(starImg.src).toContain('/star-icon.svg');
    });
  });
});

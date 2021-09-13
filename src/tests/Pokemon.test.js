import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouter } from '../components/utils/renderWithRouter';
import { Pokedex } from '../components';
import pokemons from '../data';

describe('testes do componente Pokemon', () => {
  test('testa se renderiza um card c infos de um pokemon', () => {
    const { history } = renderWithRouter(<Pokedex />);
    history.push('/');
    const pikachuName = screen.getByText(pokemons[0].name);
    expect(pikachuName).toBeInTheDocument();
    const pikachuType = screen.getAllByText(pokemons[0].type);
    expect(pikachuType).toBeInTheDocument();
    const pikachuWeight = screen.getByText('Average weight: 6.0 kg');
    expect(pikachuWeight).toBeInTheDocument();
    const pikachuImage = screen.getByRole('img');
    expect(pikachuImage).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
    expect(pikachuImage).toHaveAttribute('alt', `${pokemons[0].name} sprite`);
  });
});

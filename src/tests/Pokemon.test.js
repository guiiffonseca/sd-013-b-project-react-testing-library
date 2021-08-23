import { screen } from '@testing-library/react';
import React from 'react';
import renderWithRouter from './utils/renderWithRouter';

import App from '../App';

const POKEMON_NAME = 'Pikachu';
const POKEMON_TYPE = 'Electric';
const POKEMON_WEIGHT = 'Average weight:';
const POKEMON_MEASUREMENT = 'kg';

describe('6. Teste o componente <Pokemon.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test(`'Teste se é renderizado um card com as informações de determinado 
  pokémon.'`, () => {
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByAltText(/sprite/i);

    // O nome correto do Pokémon deve ser mostrado na tela;
    expect(pokemonName).toHaveTextContent(POKEMON_NAME);

    // O tipo correto do pokémon deve ser mostrado na tela.
    expect(pokemonType).toHaveTextContent(POKEMON_TYPE);

    // O peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, respectivamente, o peso médio do pokémon e sua unidade de medida.
    expect(pokemonWeight).toHaveTextContent(POKEMON_WEIGHT && POKEMON_MEASUREMENT);

    // A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon;
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImage).toHaveAttribute('alt', `${POKEMON_NAME} sprite`);
  });
});

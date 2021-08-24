import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './utils/renderWithRouter';
import App from '../App';
import { Pokemon } from '../components';
import pokemons from '../data';

const POKEMON_ID = '25';
const POKEMON_NAME = 'Pikachu';
const POKEMON_TYPE = 'Electric';
const POKEMON_WEIGHT = 'Average weight:';
// const POKEMON_MEASUREMENT = 'kg';
const POKEMON_MEASUREMENT_UNIT = pokemons[0].averageWeight.measurementUnit;
const POKEMON_MEASUREMENT_VALUE = pokemons[0].averageWeight.value;
const POKEMON_LINK = 'http://localhost/pokemons/';
const MORE_DETAILS_LINK = /more details/i;

describe('6. Teste o componente <Pokemon.js />', () => {
  test(`'Teste se é renderizado um card com as informações de determinado 
  pokémon.'`, () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByAltText(/sprite/i);

    // O nome correto do Pokémon deve ser mostrado na tela;
    expect(pokemonName).toHaveTextContent(POKEMON_NAME);

    // O tipo correto do pokémon deve ser mostrado na tela.
    expect(pokemonType).toHaveTextContent(POKEMON_TYPE);

    // O peso médio do pokémon deve ser exibido com um texto no formato Average weighjt: <value> <measurementUnit>; onde <value> e <measurementUnit> são, respectivamente, o peso médio do pokémon e sua unidade de medida.
    expect(pokemonWeight).toHaveTextContent(
      `${POKEMON_WEIGHT} ${POKEMON_MEASUREMENT_VALUE} ${POKEMON_MEASUREMENT_UNIT}`
    );

    // A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon;
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImage).toHaveAttribute('alt', `${POKEMON_NAME} sprite`);
  });

  test(`Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para
  exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>, onde <id> é o
  id do Pokémon exibido;`, () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByText(MORE_DETAILS_LINK);
    expect(moreDetailsLink).toBeInTheDocument();
    /* source: https://www.ti-enxame.com/pt/reactjs/como-testar-o-href-da-ancora-com-react-testing-library/812065590/ */
    expect(moreDetailsLink.href).toBe(`${POKEMON_LINK}${POKEMON_ID}`);
  });

  test(`Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento
  da aplicação para a página de detalhes de Pokémon.`, () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByText(MORE_DETAILS_LINK);
    userEvent.click(moreDetailsLink);

    const title = screen.getByRole('heading', {
      level: 2,
      name: `${POKEMON_NAME} Details`,
    });
    expect(title.textContent).toEqual(`${POKEMON_NAME} Details`);
  });

  test(`Teste também se a URL exibida no navegador muda para /pokemon/<id>,
  onde <id> é o id do Pokémon cujos detalhes se deseja ver`, () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const { id } = pokemons[0];
    const moreDetailsLink = screen.getByRole('link', { name: MORE_DETAILS_LINK });
    userEvent.click(moreDetailsLink);

    // inspiration by @raugusto96
    // const { location: { pathname } } = history;
    // expect(pathname).toBe(`/pokemons/${id}`);

    // mesma solução acima ^
    // source: https://www.tabnine.com/code/javascript/functions/history/createMemoryHistory?snippet=5f64b37bf93c3aaf60e072e0
    // const pathname = history.entries[1].pathname; /* porem o linter exige que seja desestruturado */
    const { pathname } = history.entries[1];
    expect(pathname).toMatch(`/pokemons/${id}`);
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    // O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg;
    const iconFavorite = screen.getByAltText(/is marked as favorite/i);
    expect(iconFavorite).toHaveAttribute('src', '/star-icon.svg');

    // A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite, onde <pokemon> é o nome do Pokémon exibido.
    expect(iconFavorite).toHaveAttribute('alt', `${POKEMON_NAME} is marked as favorite`);
  });
});

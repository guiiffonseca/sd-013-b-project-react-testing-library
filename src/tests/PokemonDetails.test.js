import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

import pokemons from '../data';

const { id, name } = pokemons[0];

describe('7. Teste o componente <PokemonDetails.js />', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${id}`);
  });

  test(`Teste se as informações detalhadas do Pokémon selecionado são mostradas na
  tela.`, () => {
    // A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon;
    const nameDetails = screen.getByRole('heading', {
      level: 2,
      name: `${name} Details`,
    });
    expect(nameDetails.textContent).toStrictEqual(`${name} Details`);

    // Não deve existir o link de navegação para os detalhes do Pokémon selecionado.
    const links = screen.getAllByRole('link');
    const moreDetailsLink = links.some((link) => link.textContent === /more details/i);
    expect(moreDetailsLink).toBe(false);

    // A seção de detalhes deve conter um heading h2 com o texto Summary.
    const detailsTitle = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(detailsTitle).toBeInTheDocument();

    // A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.
    const resume = screen.getByText(/This intelligent Pokémon roasts/i);
    expect(resume).toBeInTheDocument();
  });

  test(`Teste se existe na página uma seção com os mapas contendo as localizações do
  pokémon`, () => {
    // Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido.

    // Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;

    // Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização;

    // A imagem da localização deve ter um atributo src com a URL da localização;

    // A imagem da localização deve ter um atributo alt com o texto <name> location, onde <name> é o nome do Pokémon;
  });

  test('Teste se o usuário pode favoritar um pokémon através da página de detalhes.',
    () => {
      // A página deve exibir um checkbox que permite favoritar o Pokémon;

      // Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos;

      // O label do checkbox deve conter o texto Pokémon favoritado?;
    });
});

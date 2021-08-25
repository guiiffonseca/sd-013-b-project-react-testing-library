import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

import pokemons from '../data';
import userEvent from '@testing-library/user-event';

const { id, name, foundAt } = pokemons[0];
const LOCATION_NAME = 'Kanto Viridian Forest';
const LOCATION_MAP = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';

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
    const gameLocations = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${name}`,
    });
    expect(gameLocations).toHaveTextContent(`Game Locations of ${name}`);

    // Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;
    const allMapLocations = screen.queryAllByAltText(`${name} location`); // todos os mapas/imagens
    const totalMaps = foundAt.map((found) => found.map); // quantidade total de img dos map no banco
    // console.log(totalMaps);
    expect(allMapLocations[0]).toBeInTheDocument();
    expect(allMapLocations.length).toEqual(totalMaps.length);

    // Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização;
    const locationName = screen.getByText(foundAt[0].location);
    expect(locationName.textContent).toStrictEqual(foundAt[0].location); // DINÂMICO
    expect(locationName.textContent).toStrictEqual(LOCATION_NAME); // ESTÁTICO

    // A imagem da localização deve ter um atributo src com a URL da localização;
    expect(allMapLocations[0]).toHaveAttribute('src', foundAt[0].map);
    expect(allMapLocations[0]).toHaveAttribute('src', LOCATION_MAP); // ESTÁTICO quebrará se trocar o índice '0'
    
    // A imagem da localização deve ter um atributo alt com o texto <name> location, onde <name> é o nome do Pokémon;
    expect(allMapLocations[0]).toHaveAttribute('alt', `${name} location`);
  });

  test('Teste se o usuário pode favoritar um pokémon através da página de detalhes.',
    () => {
      // A página deve exibir um checkbox que permite favoritar o Pokémon;
      // const checkbox = screen.getByRole('checkbox', { checked: false }); // peguei um checkbox que não está marcado, mas não gostei disso
      const checkbox = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
      expect(checkbox).not.toBeChecked();

      // Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos;
      userEvent.click(checkbox);
      expect(checkbox).toBeChecked();

      const isMarkedFavorite = screen.getByAltText(`${name} is marked as favorite`);
      expect(isMarkedFavorite).toBeInTheDocument();

      userEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
      expect(isMarkedFavorite).not.toBeInTheDocument();

      // O label do checkbox deve conter o texto Pokémon favoritado?;
      const checkboxLabel = screen.getByLabelText('Pokémon favoritado?');
      expect(checkboxLabel).toBeInTheDocument();
    });
});

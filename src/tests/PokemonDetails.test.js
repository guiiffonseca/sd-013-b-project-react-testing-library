import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utilities/renderWithRouter';
import App from '../App';

describe('Teste o componente PokemonDetails', () => {
  const MORE_DETAILS = 'More details';
  test('as infos detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    renderWithRouter(<App />);
    const buttonDetails = screen.getByRole('link', { name: MORE_DETAILS });
    // Não deve existir o link de navegação para os detalhes do Pokémon selecionado
    userEvent.click(buttonDetails);
    expect(buttonDetails).toBeEnabled();

    const pokemonDetails = screen.getByText(/Pikachu Details/i);
    expect(pokemonDetails).toBeInTheDocument();

    // A seção de detalhes deve conter um heading h2 com o texto Summary.
    const summary = screen.getByRole('heading', { name: /Summary/, level: 2 });
    expect(summary).toBeInTheDocument();

    // A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.
    const paragraph = screen.getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(paragraph).toBeInTheDocument();
  });
  test('Existe na página uma seção com os mapas contendo as localiz. do pokémon', () => {
    renderWithRouter(<App />);
    // Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido.
    const buttonDetails = screen.getByRole('link', { name: MORE_DETAILS });
    userEvent.click(buttonDetails);

    const h2 = screen.getByRole('heading',
      { level: 2, name: 'Game Locations of Pikachu' });
    expect(h2).toBeInTheDocument();

    // Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização
    const locationPokemon = screen.getAllByRole('img', { name: 'Pikachu location' });
    expect(locationPokemon).toHaveLength(2);
    expect(locationPokemon[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locationPokemon[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    const kantoViridianText = screen.getByText('Kanto Viridian Forest');
    expect(kantoViridianText).toBeInTheDocument();
    const kantoPowerText = screen.getByText('Kanto Power Plant');
    expect(kantoPowerText).toBeInTheDocument();
  });

  test('O usuário pode favoritar um pokémon através da página de detalhes.', () => {
    renderWithRouter(<App />);
    const buttonDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(buttonDetails);
    // A página deve exibir um checkbox que permite favoritar o Pokémon;
    const checkbox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);

    const favoritePokemon = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(favoritePokemon).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(favoritePokemon).toBeEnabled();
  });
});

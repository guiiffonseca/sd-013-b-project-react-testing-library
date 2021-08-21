import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente <PokemonDetails.js />', () => {
  const url = '/pokemons/25';

  test(`Verifica se as informações detalhadas do Pokémon
  selecionado são mostradas na tela.`,
  () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetails);
    const pokemonDetails = screen.getByRole('heading', {
      level: 2,
      name: /Pikachu Details/i,
    });
    expect(pokemonDetails).toBeInTheDocument();
    expect(pokemonDetails).toHaveTextContent('Pikachu Details');
    // Não deve existir o link de navegação para os detalhes do Pokémon selecionado.
    expect(moreDetails).not.toBeInTheDocument();
  });

  test('A seção de detalhes deve conter um heading h2 com o texto Summary.', () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);
    const summary = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(summary).toBeInTheDocument();

    // A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.
    const paragraph = screen.getByText(/this intelligent pokémon/i);
    expect(paragraph).toBeInTheDocument();
  });

  test(`Teste se existe na página uma seção com os mapas contendo as
  localizações do pokémon`,
  () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);
    const allLocation = screen.getAllByAltText(/pikachu location/i);
    expect(allLocation).toHaveLength(2);
    const title = screen.getByRole('heading', {
      level: 2,
      name: /Game Locations of Pikachu/i,
    });
    expect(title).toBeInTheDocument();
    const firstLocation = screen.getAllByAltText(/pikachu location/i)[0];
    const secondLocation = screen.getAllByAltText(/pikachu location/i)[1];
    expect(firstLocation).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(secondLocation).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('Verifica se o usuário pode favoritar um pokémon através da página de detalhes.',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push(url);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
      expect(checkbox.checked).toEqual(false);
      userEvent.click(checkbox);
      expect(checkbox.checked).toEqual(true);
      const textCheckbox = screen.getByLabelText(/Pokémon favoritado?/i);
      expect(textCheckbox).toBeInTheDocument();
    });
});

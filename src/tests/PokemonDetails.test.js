import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

const PATH = '/pokemons/25';
describe('Testando o componente <PokemonDetails.js />', () => {
  test('texto <name> Details, onde <name> é o nome do Pokémon;', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH);
    const detailText = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    expect(detailText).toBeInTheDocument();
  });

  test('Não deve existir o link de navegação para os detalhes do Pokémon selecionado.',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkMoreDetails = screen.getByRole('link', {
        name: /More details/i,
      });
      history.push('pokemons/25');
      expect(linkMoreDetails).not.toBeInTheDocument();
    });

  test('A seção de detalhes deve conter um heading h2 com o texto Summary.', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH);
    const summaryText = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(summaryText).toBeInTheDocument();
  });

  const SUMMARY = () => {
    const fisrtPart = 'This intelligent Pokémon roasts hard berries';
    const secondPart = 'with electricity to make them tender enough to eat.';
    return `${fisrtPart} ${secondPart}`;
  };
  test('testa se o resumo do Pokémon específico é renderizado.', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH);
    const summaryText = screen.getByText(SUMMARY());
    expect(summaryText).toBeInTheDocument();
  });

  test('Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push(PATH);
      const locationText = screen.getByRole('heading', {
        level: 2,
        name: 'Game Locations of Pikachu',
      });
      expect(locationText).toBeInTheDocument();
    });

  test('Teste se imagem e texto com localização',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push(PATH);
      const imgs = screen.getAllByRole('img');

      const locationOne = screen.getByText('Kanto Viridian Forest');
      const locationTwo = screen.getByText('Kanto Power Plant');

      expect(locationOne).toBeInTheDocument();
      expect(imgs[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
      expect(imgs[1]).toHaveAttribute('alt', 'Pikachu location');

      expect(locationTwo).toBeInTheDocument();
      expect(imgs[2]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
      expect(imgs[2]).toHaveAttribute('alt', 'Pikachu location');
    });

  test('checkbox quando clicada marca o favorito, se clicar novamente desmarca', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH);
    const favoriteCheck = screen.getByLabelText('Pokémon favoritado?');

    expect(favoriteCheck).toBeInTheDocument();

    // marca como favorito
    userEvent.click(favoriteCheck);
    expect(favoriteCheck.checked).toEqual(true);

    // desmarca como favorito
    userEvent.click(favoriteCheck);
    expect(favoriteCheck.checked).toEqual(false);
  });
});

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/helper';
import App from '../App';

describe('Teste o componente PokemonDetails', () => {
  test('Se as informações do Pokémon selecionado são mostradas na tela.', () => {
    renderWithRouter(<App />);
    const nameText = screen.getByTestId('pokemon-name');
    expect(nameText).toHaveTextContent('Pikachu');

    const detailLink = screen.getByText(/More details/i);
    userEvent.click(detailLink);
    expect(detailLink).not.toBeInTheDocument();

    const pokeDetails = screen.getByRole('heading', {
      level: 2,
      name: /Pikachu Detail/i,
    });
    expect(pokeDetails).toBeInTheDocument();

    const summary = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(summary).toBeInTheDocument();

    const sumText = screen.getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(sumText).toBeInTheDocument();
  });

  test('Se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const detailLink = screen.getByText(/More details/i);
    userEvent.click(detailLink);

    const pokeLocation = screen.getByRole('heading', {
      level: 2,
      name: /Game Locations of/i,
    });
    expect(pokeLocation).toHaveTextContent('Pikachu');
    expect(pokeLocation).toBeInTheDocument();

    const locOne = screen.getByText('Kanto Viridian Forest');
    const locTwo = screen.getByText('Kanto Power Plant');
    expect(locOne).toBeInTheDocument();
    expect(locTwo).toBeInTheDocument();

    const locImage = screen.getAllByAltText('Pikachu location');
    const src = [
      'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    ];
    locImage.forEach((img, index) => {
      expect(img.src).toBe(src[index]);
    });
  });

  test('Se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const detailLink = screen.getByText(/More details/i);
    userEvent.click(detailLink);

    const favCheck = screen.getByRole('checkbox', { name: /Pokémon favoritado/i });
    expect(favCheck).toBeInTheDocument();

    userEvent.click(favCheck);
    const favIcon = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(favIcon).toBeInTheDocument();
    userEvent.click(favCheck);
    expect(favIcon).not.toBeInTheDocument();
  });
});

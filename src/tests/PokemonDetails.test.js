import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('PokemonDetails.js', () => {
  test('testa se as informações  do Pokemon selecionado aparece na tela ', () => {
    const megicNumber = 3;
    const pa = /this intelligent Pokémon roasts hard berries with electricity /i;
    const { history } = renderWithRouter(<App />);
    history.push('pokemons/25');

    const details = screen.getByRole('heading', {
      name: 'Pikachu Details',
      level: 2,
    });
    expect(details).toBeInTheDocument();

    const navLink = screen.getByRole('navigation', {
      nome: 'More details',
    });
    userEvent.click(navLink);
    const pokemonDetails = screen.getByText('Pikachu');
    expect(pokemonDetails).toBeInTheDocument();

    const notLink = screen.getAllByRole('link', {
      nome: /more details/i,
    });
    expect(notLink.length).toEqual(megicNumber);

    const section = screen.getByRole('heading', {
      name: 'Summary',
      level: 2,
    });
    expect(section).toBeInTheDocument();

    const paragraf = screen.getByText(pa);
    expect(paragraf).toBeInTheDocument();
  });

  test('testa se existe na page uma seção com mapas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('pokemons/25');

    const navLink = screen.getByRole('navigation', {
      nome: 'More details',
    });
    userEvent.click(navLink);

    const section2 = screen.getByRole('heading', {
      name: 'Game Locations of Pikachu',
      level: 2,
    });
    expect(section2).toBeInTheDocument();

    const location = screen.getByText(/Kanto Viridian Forest/i);
    expect(location).toBeInTheDocument();

    const location2 = screen.getByText(/Kanto Power Plant/i);
    expect(location2).toBeInTheDocument();

    const image = screen.getAllByRole('img');
    expect(image[1]).toHaveAttribute('alt', 'Pikachu location');
    expect(image[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(image[2]).toHaveAttribute('alt', 'Pikachu location');
    expect(image[2]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    const chek = screen.getByRole('checkbox', {
      checked: false,
    });
    expect(chek).toBeInTheDocument();

    userEvent.click(chek);

    const Star = screen.getByRole('img', {
      name: 'Pikachu is marked as favorite',
    });
    expect(Star).toBeInTheDocument('src', '/star-icon.svg');

    const label = screen.getByLabelText('Pokémon favoritado?');

    expect(label).toBeInTheDocument();
  });
});

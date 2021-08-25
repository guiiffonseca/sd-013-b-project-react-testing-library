import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Pokemon.js', () => {
  const route = '/pokemons/25';
  test('testa se é renderizado um card com informações de um pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(route);

    const nome = screen.getByTestId('pokemon-name');
    expect(nome).toBeInTheDocument();

    const typePikachu = screen.getAllByText(/electric/i);
    expect(typePikachu.length).toBe(2);

    const typo = screen.getByTestId('pokemon-type');
    expect(typo).toBeInTheDocument();

    const pesoMedio = screen.getByTestId('pokemon-weight');
    expect(pesoMedio).toBeInTheDocument();

    const imgs = screen.getByRole('img', {
      name: 'Pikachu sprite',
    });
    expect(imgs).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test(`testa se a URL exibida no navegador muda para /pokemon/<id>, onde <id> 
    é o id do Pokémon cujos detalhes se deseja ver`, () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: 'More details',
    });
    userEvent.click(detailsLink);

    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test(`testa se ao clicar no link "More details"
    vai para page detalhes de Pokémon`, () => {
    const { history } = renderWithRouter(<App />);
    history.push(route);

    const navLink = screen.getByRole('navigation', {
      nome: 'More details',
    });
    userEvent.click(navLink);
    const pokemonDetails = screen.getByText('Pikachu');
    expect(pokemonDetails).toBeInTheDocument();
  });

  test('testa se existe um ícone de estrela Pokémons favoritos', () => {
    const { history } = renderWithRouter(<App />);
    history.push(route);

    const favoitStar = screen.getByRole('checkbox', {
      name: /pokémon favoritado/i,
    });

    userEvent.click(favoitStar);

    const imageStar = screen.getByRole('img', {
      name: 'Pikachu is marked as favorite',
    });
    expect(imageStar).toHaveAttribute('src', '/star-icon.svg');
  });
});

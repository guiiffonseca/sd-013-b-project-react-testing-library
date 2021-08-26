import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Pokemon.js', () => {
  const route = '/pokemons/25';
  const tipoPikachu = 2;
  const averages = 'Average weight:';
  test('testa se é renderizado um card com informações de um pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(route);

    const nome = screen.getByTestId('pokemon-name');
    expect(nome).toBeInTheDocument();

    const typePikachu = screen.getAllByText(/electric/i);
    expect(typePikachu.length).toBe(tipoPikachu);

    const typo = screen.getByTestId('pokemon-type');
    expect(typo).toBeInTheDocument();

    const pesoMedio = screen.getByTestId('pokemon-weight');
    expect(pesoMedio)
      .toHaveTextContent(
        `${averages} ${pokemons[0].averageWeight.value} ${pokemons[0]
          .averageWeight.measurementUnit}`,
      );
  });

  test('A imagem do Pokémon deve ser exibida', () => {
    renderWithRouter(<App />);
    const image = screen.getAllByRole('img');
    expect(image[0]).toHaveAttribute('alt', 'Pikachu sprite');
    expect(image[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test(`testa se a URL exibida no navegador muda para /pokemon/<id>, onde <id> 
    é o id do Pokémons cujos detalhes se deseja ver`, () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: 'More details',
    });
    userEvent.click(detailsLink);

    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('URL exibida no navegador muda é o id do Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(route);
    const numPikachu = screen.getAllByText(/pikachu/i);
    const num = 3;
    expect(numPikachu.length).toBe(num);
  });

  test('Teste se o tipo do pokemons aparece', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/4');
    const tipo = screen.getByText(/fire/i);
    expect(tipo).toBeInTheDocument();
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

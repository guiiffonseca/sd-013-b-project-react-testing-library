import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('teste', () => {
  const details = 'More details';
  const urlPokemon = '/pokemons/25';

  it(`Ao entrar na página verifica se é renderizado 
  um card com as informações de determinado pokémon.`, () => {
    renderWithRouter(<App />);
    const Url = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByRole('img');

    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokemonImg).toHaveAttribute('src', Url);
    expect(pokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
  });

  it(`Ao entrar na página verifica se o card do Pokémon indicado na Pokédex 
  contém um link de navegação para exibir detalhes deste Pokémon. 
  O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido;`, () => {
    renderWithRouter(<App />);
    const linkDetail = screen.getByRole('link', {
      name: details,
    });
    expect(linkDetail).toBeInTheDocument();
    expect(linkDetail).toHaveAttribute('href', urlPokemon);
  });

  it(`Ao entrar na página verifica se ao clicar no link de navegação do Pokémon, 
  é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.`, () => {
    const { history } = renderWithRouter(<App />);
    const linkDetail = screen.getByRole('link', {
      name: details,
    });
    userEvent.click(linkDetail);

    const pokemonDetails = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });

    expect(pokemonDetails).toBeInTheDocument();
    expect(history.location.pathname).toBe(urlPokemon);
  });

  it(`Ao entrar na página verifica se a URL exibida no navegador muda 
  para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver;`, () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: details,
    });
    userEvent.click(detailsLink);

    expect(history.location.pathname).toBe(urlPokemon);
  });

  it(`Ao entrar na página verifica se existe um ícone de
   estrela nos Pokémons favoritados.`, () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: details,
    });
    userEvent.click(detailsLink);

    const addFavoriteText = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(addFavoriteText);

    const favoriteImg = screen.getByRole('img', {
      name: 'Pikachu is marked as favorite',
    });
    expect(favoriteImg).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteImg).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});

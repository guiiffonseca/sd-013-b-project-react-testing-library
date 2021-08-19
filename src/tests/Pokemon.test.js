import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
// import Pokemon from '../components/Pokemon';
import App from '../App';

describe(' Teste o componente <Pokemon.js />', () => {
  test('Card renderiza as informações de determinado pokémon.', () => {
    // renderiza:
    renderWithRouter(<App />);
    // testa informações do pokemon:
    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toHaveTextContent('Pikachu');

    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toHaveTextContent('Electric');

    const weightPokemon = screen.getByTestId('pokemon-weight');
    expect(weightPokemon).toHaveTextContent(/6.0/i);

    const imagePokemon = screen.getByAltText(/sprite/i);
    expect(imagePokemon.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Conter Link de detalhes,URl/pokemons/<id> onde id é do pokemon', () => {
    // renderiza:
    renderWithRouter(<App />);
    // testa :
    const linkMoreDetails = screen.getByText(/More details/i);
    expect(linkMoreDetails).toBeInTheDocument();
  });

  test('Ao clicar no link detalhes, é redirecionado para a página de detalhes', () => {
    // renderiza:
    renderWithRouter(<App />);

    // simula clique no botao detalhes:
    const linkMoreDetails = screen.getByText(/More details/i);
    userEvent.click(linkMoreDetails);

    // testa se redireciona para pagina com detalhes:
    const titlePokemonDetails = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    expect(titlePokemonDetails).toBeInTheDocument();
  });

  test('Teste também se a URL exibida no navegador muda para /pokemon/<id>', () => {
    // renderiza:
    const { history } = renderWithRouter(<App />);

    // simula clique no botao detalhes:
    const linkMoreDetails = screen.getByText(/More details/i);
    userEvent.click(linkMoreDetails);

    // Testa URL :
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    // renderiza:
    renderWithRouter(<App />);

    // simula click em mais detalhes:
    userEvent.click(screen.getByText(/More details/));

    // acessa checkbox para favoritar:
    const favoriteCheckbox = screen.getByRole('checkbox');
    expect(favoriteCheckbox).toBeInTheDocument();

    // simula click para favoritar:
    userEvent.click(favoriteCheckbox);

    // testa se pokemon foi favoritado:
    const pokemonFavorited = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(pokemonFavorited).toBeInTheDocument();

    // testa se tem icone:
    userEvent.click(favoriteCheckbox);
    expect(pokemonFavorited).toHaveProperty('src', 'http://localhost/star-icon.svg');

  });
});

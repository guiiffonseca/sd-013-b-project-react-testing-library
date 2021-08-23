import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente Pokemon.js', () => {
  it('Se é renderizado um card com as informações do pokemon', () => {
    const testPokemon = pokemons[0];
    renderWithRouter(<App pokemon={ testPokemon } />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByRole('img');
    const pokemonLink = screen.getByText(/More Details/i);

    expect(pokemonName.textContent).toBe('Pikachu');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toHaveTextContent(
      'Average weight: '
      + `${testPokemon.averageWeight.value} ${testPokemon.averageWeight.measurementUnit}`,
    );
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonImg).toHaveAttribute('src', `${testPokemon.image}`);
    expect(pokemonImg).toHaveAttribute('alt', `${testPokemon.name} sprite`);
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonLink).toHaveAttribute('href', `/pokemons/${testPokemon.id}`);
    expect(pokemonLink).toBeInTheDocument();
  });

  it('Se ao clicar no link, é redirecionada para pagina de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const pokemonLink = screen.getByText(/More Details/i);
    userEvent.click(pokemonLink);
    const detailsPage = screen.getByText('Summary');
    expect(detailsPage).toBeInTheDocument();
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Se existe um ícone de estrela nos Pokémons favoritados', () => {
    const testPokemon = pokemons[0];
    renderWithRouter(<App pokemon={ testPokemon } />);
    const pokemonLink = screen.getByText(/More Details/i);
    userEvent.click(pokemonLink);
    const favPokemon = screen.getByRole('checkbox');
    userEvent.click(favPokemon);
    //  history.push('/');
    const favoriteStar = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(favoriteStar).toBeInTheDocument();
  });
});

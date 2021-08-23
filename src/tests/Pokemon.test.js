import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../unit/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Requisito 6', () => {
  const moreDetails = 'More details';

  test('Teste se é renderizado um card'
  + ' com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const deitailedInfoLink = screen.getByRole('link', { name: moreDetails });
    const nextBtnPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
    pokemons.forEach((pokemon) => {
      const { id, name, type, averageWeight, image } = pokemon;
      const pokemonImage = screen.getByAltText(`${name} sprite`);
      expect(pokemonName).toHaveTextContent(name);
      expect(pokemonType).toHaveTextContent(type);
      expect(pokemonWeight).toHaveTextContent(
        `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`,
      );
      expect(pokemonImage).toBeInTheDocument();
      expect(pokemonImage.src).toBe(image);
      expect(deitailedInfoLink.href).toBe(`http://localhost/pokemons/${id}`);
      fireEvent.click(nextBtnPokemon);
    });
  });

  test('teste se redireciona aos Detalhes, ao clicar no link "More details', () => {
    const { history } = renderWithRouter(<App />);
    const deitailedInfoLink = screen.getByRole('link', { name: moreDetails });
    fireEvent.click(deitailedInfoLink);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    const deitailedInfoLink = screen.getByRole('link', { name: moreDetails });
    fireEvent.click(deitailedInfoLink);
    expect(history.location.pathname).toBe('/pokemons/25');
    const toFavoritePokemon = screen.getByLabelText('Pokémon favoritado?',
      { selector: 'input' });
    fireEvent.click(toFavoritePokemon);
    const favoritePokemonImage = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoritePokemonImage).toBeInTheDocument();
    expect(favoritePokemonImage.src).toBe('http://localhost/star-icon.svg');
  });
});

import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testando o component Pokemon', () => {
  test('Se é renderizado um card com as informações de um determinado Pokémon', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getByTestId('pokemon-name');

    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemon).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    const pokemonSprite = screen.getByAltText('Pikachu sprite');
    expect(pokemonSprite.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

    // Erro nos testes: TypeError: Cannot destructure property 'averageWeight' of 'pokemon' as it is undefined.
    // Desestruturando averageWeight:
    const { averageWeight: { value, measurementUnit } } = pokemons[0];
    expect(pokemonWeight)
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
  });
  test('Se contém um link para mais detalhes do Pokémon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText(/More details/i);
    fireEvent(moreDetails);

    const moreDetailsPage = screen.getByRole('heading', {
      level: 2,
      name: /Pickachu Details/i,
    });
    expect(moreDetailsPage).toBeInTheDocument();
  });
  test('Se a página redireciona ao acessar o link /pokemons/:id', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByText(/More details/i);
    fireEvent(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('pokemons/25');
  });
  test('Se a página contém a estrela nos pokémons favoritados', () => {
    renderWithRouter(<App />);
    const favorite = screen.getByText(/More Details/i);

    fireEvent(favorite);

    const checkbox = screen.getByText('Pokemon favoritado?');
    expect(checkbox).toBeInTheDocument();

    fireEvent.click(checkbox);

    const favoritePokemon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoritePokemon).toBeInTheDocument();

    fireEvent(favoritePokemon);
    expect(favoritePokemon.src).toBe('http://localhost/star-icon.svg');
  });
});

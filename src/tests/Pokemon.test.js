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
    const moreDetailsLink = screen.getByText(/More details/i);
    expect(moreDetailsLink).toBeInTheDocument();
    expect(moreDetailsLink).toHaveAttribute('href', '/pokemons/25');
  });
  test('Se a página redireciona ao acessar o link /pokemons/:id', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText(/More details/i);
    fireEvent.click(moreDetails);

    const details = screen.getByRole('heading', {
      level: 2,
      name: /Pikachu details/i,
    });
    expect(details).toBeInTheDocument();
  });
  test('Se a página contém a estrela nos pokémons favoritados', () => {
    renderWithRouter(<App />);
    const favorite = screen.getByText(/More Details/i);

    fireEvent.click(favorite);

    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();

    fireEvent.click(checkbox);

    const favoritePokemon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoritePokemon).toBeInTheDocument();

    fireEvent.click(favoritePokemon);
    expect(favoritePokemon.src).toBe('http://localhost/star-icon.svg');
  });
});

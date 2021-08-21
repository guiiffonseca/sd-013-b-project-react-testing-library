import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const moreDetails = screen.getByRole('link', {
  name: 'More details',
});

describe('testa o componente Pokemon', () => {
  test('testa se é renderizado o pokemon card com as informações', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Pikachu');
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Electric');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    const pokemonImg = screen.getByAltText('Pikachu sprite');
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    // const moreDetails = screen.getByRole('link', {
    //   name: 'More details',
    // });
    expect(moreDetails).toBeInTheDocument();
  });
  test('testa se o card contem link para exibir detalhes do pokemon', () => {
    renderWithRouter(<App />);

    // const moreDetails = screen.getByRole('link', {
    //   name: 'More details',
    // });
    expect(moreDetails).toHaveAttribute('href', '/pokemons/25');
  });
  test('testa se link more details redireciona para a página de detalhes', () => {
    renderWithRouter(<App />);

    // const moreDetails = screen.getByRole('link', {
    //   name: 'More details',
    // });
    userEvent.click(moreDetails);
    const detailsPage = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    expect(detailsPage).toBeInTheDocument();
  });
  test('testa se a URL contem pokemons/<id>', () => {
    const { history } = renderWithRouter(<App />);

    // const moreDetails = screen.getByRole('link', {
    //   name: 'More details',
    // });
    userEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  test('testa se existe icone de estrela nos pokemons favoritados', () => {
    renderWithRouter(<App />);

    // const moreDetails = screen.getByRole('link', {
    //   name: 'More details',
    // });
    userEvent.click(moreDetails);
    const favoriteInput = screen.getByLabelText(/pokémon favoritado/i);
    userEvent.click(favoriteInput);
    const favoriteIcon = screen.getByAltText(/marked as favorite/i);
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteIcon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});

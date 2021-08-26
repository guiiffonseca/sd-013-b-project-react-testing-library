import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';
import App from '../App';

const pokemon = pokemons[0];
const isFavorite = true;

describe('Testando o componente Pokémon', () => {
  it('Testa se é rederizado um card com as informações do pokémon', () => {
    render(
      <BrowserRouter>
        <Pokemon pokemon={ pokemon } />
      </BrowserRouter>,
    );
    const { image, name, averageWeight: { value, measurementUnit } } = pokemon;

    const pokeName = screen.getByText(name);
    expect(pokeName).toBeInTheDocument();

    const pokeType = screen.getByTestId('pokemon-type').innerHTML;
    expect(pokeType).toBe('Electric');

    const pokeImg = screen.getByAltText(`${name} sprite`);
    expect(pokeImg.src).toBe(image);

    const pokeWeight = screen.getByTestId('pokemon-weight').innerHTML;
    expect(pokeWeight).toBe(`Average weight: ${value} ${measurementUnit}`);
  });

  it('Testa se o card do pokemon indicado contém link de exibir detalhes', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Pokemon pokemon={ pokemon } />
      </Router>,
    );

    const linkDetails = screen.getByText(/More details/i);
    expect(linkDetails).toBeInTheDocument();
    const { id } = pokemon;

    fireEvent.click(linkDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('Testa se clicar no link do Pokemon redireciona para detalhes do pokemon', () => {
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    const { name } = pokemon;
    const detailsLink = screen.getByText(/More details/i);
    expect(detailsLink).toBeInTheDocument();

    fireEvent.click(detailsLink);
    const pokeDetails = screen.getByText(`${name} Details`);
    expect(pokeDetails).toBeInTheDocument();
  });

  it('Testa se existe um icone de estrela nos pokemons favoritados', () => {
    render(
      <BrowserRouter>
        <Pokemon
          pokemon={ pokemon }
          isFavorite={ isFavorite }
        />
      </BrowserRouter>,
    );

    const { name } = pokemon;
    const favorite = screen.getByAltText(`${name} is marked as favorite`);
    expect(favorite).toHaveAttribute('src', '/star-icon.svg');
  });
});

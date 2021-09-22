import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testando o componente PokemonDetails', () => {
  test('Testando se informacoes do pokemon sao mostradas', () => {
    renderWithRouter(<App />);
    const details = screen.getByText(/more details/i);
    userEvent.click(details);

    const header = screen.getByRole('heading', {
      level: 2,
      name: /pikachu details/i });

    expect(header).toBeInTheDocument();
    expect(details).toBeInTheDocument();

    const summary = screen.getByRole('heading', {
      level: 2, name: /Summary/i });

    expect(summary).toBeInTheDocument();

    const pokeSumma = screen.getByText(/electricity/i);
    expect(pokeSumma).toBeInTheDocument();

    const CatLocationLength = pokemons[2].foundAt.length;

    const locImg = screen.getAllByRole('img', { name: /caterpie location/i });
    expect(locImg).toHaveLength(CatLocationLength);

    const location1 = pokemons[2].foundAt[0].map;
    const location2 = pokemons[2].foundAt[1].map;
    const location3 = pokemons[2].foundAt[2].map;
    const location4 = pokemons[2].foundAt[3].map;

    expect(locImg[0]).toHaveAttribute('src', location1);
    expect(locImg[1]).toHaveAttribute('src', location2);
    expect(locImg[2]).toHaveAttribute('src', location3);
    expect(locImg[3]).toHaveAttribute('src', location4);

    expect(locImg[0]).toHaveAttribute('alt', `${caterpie} location`);
    expect(locImg[1]).toHaveAttribute('alt', `${caterpie} location`);
    expect(locImg[2]).toHaveAttribute('alt', `${caterpie} location`);
    expect(locImg[3]).toHaveAttribute('alt', `${caterpie} location`);

    const checkbox = screen.getByLabelText('Pokémon Favoritado?');
    expect(checkbox).toBeInTheDocument();
  });
});

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import About from '../components/About';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';
import renderWithRouter from './util/renderWithRouter';
import App from '../App';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Testando o "Pokemon Details"', () => {
  it('Testando  deve conter um texto <name> Details', () => {
    renderWithRouter(<App />);
    const btnMoreDetails = screen.getByRole('link', { name: /More Details/i });
    expect(btnMoreDetails).toBeInTheDocument();
    userEvent.click(btnMoreDetails);
    const titleNamePokemon = screen
      .getByRole('heading', { name: `${pokemons[0].name} Details` });
    expect(titleNamePokemon).toBeInTheDocument();
  });

  it('Testando Não deve existir o link de navegação para os detalhes', () => {
    renderWithRouter(<App />);
    const btnMoreDetails = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(btnMoreDetails);
    expect(btnMoreDetails).not.toBeInTheDocument();
  });

  it('Testando A seção de detalhes deve conter heading h2 com o texto "Summary"', () => {
    renderWithRouter(<App />);
    const btnMoreDetails = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(btnMoreDetails);
    const summaryH2 = screen
      .getByRole('heading', { name: /Summary/i });
    expect(summaryH2).toBeInTheDocument();
  });

});

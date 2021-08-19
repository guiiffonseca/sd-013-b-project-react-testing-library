import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import renderWithRouter from './util/renderWithRouter';
import App from '../App';

// const isPokemonFavoriteById = {
//   4: false,
//   10: false,
//   23: false,
//   25: false,
//   65: false,
//   78: false,
//   143: false,
//   148: false,
//   151: false,
// };

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
  it('Testando seção de detalhes deve conter heading h2 com o texto "Summary"', () => {
    renderWithRouter(<App />);
    const btnMoreDetails = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(btnMoreDetails);
    const summaryH2 = screen
      .getByRole('heading', { name: /Summary/i });
    expect(summaryH2).toBeInTheDocument();
  });
  it('Testando deve conter um parágrafo com o resumo do Pokémon', () => {
    renderWithRouter(<App />);
    const btnMoreDetails = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(btnMoreDetails);
    const pSummary = screen.getByText(/This intelligent Pokémon/i);
    expect(pSummary).toBeInTheDocument();
  });
  // it('Testando deve conter um parágrafo com o resumo do Pokémon', () => {
  //   renderWithRouter(<App />);
  //   const btnMoreDetails = screen.getByRole('link', { name: /More Details/i });
  //   userEvent.click(btnMoreDetails);
  //   const pSummary = screen.getByText(/This intelligent Pokémon/i);
  //   expect(pSummary).toBeInTheDocument();
  // });
});

describe('Teste se existe os mapas contendo as localizações do pokémon', () => {
  it('seção de detalhes deverá existir um heading h2', () => {
    renderWithRouter(<App />);
    const btnMoreDetails = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(btnMoreDetails);
    const h2Maps = screen.getByRole('heading', {
      name: `Game Locations of ${pokemons[0].name}`,
    });
    expect(h2Maps).toBeInTheDocument();
  });
  it('Testando as localizações do Pokémon', () => {
    renderWithRouter(<App />);
    const btnMoreDetails = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(btnMoreDetails);
    const imgLocation = screen.getAllByAltText(/Pikachu location/i);
    expect(imgLocation.length).toBe(2);
  });
  it('Testando nome da location e o map', () => {
    renderWithRouter(<App />);
    const btnMoreDetails = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(btnMoreDetails);
    const imgLocation = screen.getAllByAltText(/Pikachu location/i);
    expect(imgLocation[0].src).toBe(pokemons[0].foundAt[0].map);
    expect(imgLocation[1].src).toBe(pokemons[0].foundAt[1].map);

    const textLocation1 = screen.getByText(pokemons[0].foundAt[0].location);
    expect(textLocation1).toHaveTextContent(pokemons[0].foundAt[0].location);

    const textLocation2 = screen.getByText(pokemons[0].foundAt[1].location);
    expect(textLocation2).toHaveTextContent(pokemons[0].foundAt[1].location);

    expect(imgLocation[0].alt).toBe(`${pokemons[0].name} location`);
    expect(imgLocation[1].alt).toBe(`${pokemons[0].name} location`);
  });
  it('Testando favoritar um pokémon', () => {
    renderWithRouter(<App />);
    const btnMoreDetails = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(btnMoreDetails);
    const inputChecked = screen.getByLabelText(/Pokémon favoritado/i);
    expect(inputChecked).toBeInTheDocument();
    userEvent.click(inputChecked);
    const imgEstrela = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(imgEstrela).toBeInTheDocument();
    userEvent.click(inputChecked);
    expect(imgEstrela).not.toBeInTheDocument();
  });
});

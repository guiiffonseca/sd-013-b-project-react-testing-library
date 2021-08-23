import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';

describe('Verifica o componente Pokedex', () => {
  const pokemonNameDataTestId = 'pokemon-name';
  const pokemonTypeDataTestId = 'pokemon-type-button';
  it('Verifica se há heading h2 com Encountered pokémons', () => {
    renderWithRouter(<App />);
    const headingFind = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(headingFind).toBeInTheDocument();
  });

  it('Verifica se o botão contem o texto Próximo pokémon', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(nextButton).toBeInTheDocument();
  });

  it('Verifica se são mostrados proximos pokemons da lista ao clicar no botao', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    const pokemonName = screen.getByTestId(pokemonNameDataTestId);
    userEvent.click(nextButton);
    expect(pokemonName.textContent).toBe('Charmander');
    userEvent.click(nextButton);
    expect(pokemonName.textContent).toBe('Caterpie');
    userEvent.click(nextButton);
    expect(pokemonName.textContent).toBe('Ekans');
  });

  it('O primeiro deve ser mostrado ao clicar, se estiver no último Pokémon', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    //  const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonName = screen.getByTestId(pokemonNameDataTestId);
    expect(pokemonName.textContent).toBe('Dragonair');
    userEvent.click(nextButton);
    expect(pokemonName.textContent).toBe('Pikachu');
  });

  it('Se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    //  const pokemonName = screen.getAllByTestId('pokemon-name');
    const pokemonName = screen.getAllByTestId(pokemonNameDataTestId);
    expect(pokemonName.length).toBe(1);
  });

  it('Se existe apenas um botão de filtragem para cada tipo de Pokémon', () => {
    renderWithRouter(<App />);
    const CATEGORIES_COUNT = 7;
    const categoriesButtons = screen.getAllByTestId(pokemonTypeDataTestId);
    expect(categoriesButtons.length).toBe(CATEGORIES_COUNT);
  });

  it('Se deve circular somente pelos pokémons daquele tipo selecionado', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    const categoriesButtons = screen.getAllByTestId(pokemonTypeDataTestId);
    expect(categoriesButtons[0].textContent).toBe('Electric');
    userEvent.click(nextButton);
    expect(categoriesButtons[1].textContent).toBe('Fire');
  });

  it('Se o botão All está sempre visível', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByText('All');
    expect(allButton.textContent).toBe('All');
  });

  it('se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    const reset = screen.getByText('All');
    const categoriesButtons = screen.getAllByTestId(pokemonTypeDataTestId);
    expect(categoriesButtons[0].textContent).toBe('Electric');
    userEvent.click(nextButton);
    expect(categoriesButtons[1].textContent).toBe('Fire');
    userEvent.click(reset);
    expect(categoriesButtons[0].textContent).toBe('Electric');
  });
});

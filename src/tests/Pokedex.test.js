import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('pokedex test', () => {
  test('exibe 7 botões de classe e se eles estão funcionais', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    customHistory.push('/');

    const counterButton = 7;
    const searchButton = screen.getAllByTestId('pokemon-type-button');
    expect(searchButton.length).toBe(counterButton);

    userEvent.click(searchButton[1]);
    const searchFirePokemon = screen.getByText('Charmander');
    expect(searchFirePokemon).toBeInTheDocument();

    userEvent.click(searchButton[6]);
    const searchDragonPokemon = screen.getByText('Dragonair');
    expect(searchDragonPokemon).toBeInTheDocument();
  });

  test('exibe o botão ALL e o botão PROXIMO POKEMON', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    customHistory.push('/');

    const searchButtonAll = screen.getByRole('button', {
      name: 'All',
    });
    expect(searchButtonAll).toBeInTheDocument();

    const searchButtonNext = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(searchButtonNext).toBeInTheDocument();

    userEvent.click(searchButtonNext);
    const pokemonChamander = screen.getByText('Charmander');
    expect(pokemonChamander).toBeInTheDocument();

    userEvent.click(searchButtonAll);
    const pokemonPikachu = screen.getByText('Pikachu');
    expect(pokemonPikachu).toBeInTheDocument();
  });

  test('exibe um título com a frade Encountered pokémons', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    customHistory.push('/');

    const searchTitle = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(searchTitle).toBeInTheDocument();
  });

  test('ao clicar no botao BUG exibe o Caterpie', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    customHistory.push('/');

    const pokemonName = 'Caterpie';
    const pokemonCategory = 'Bug';
    const searchButton = screen.getByRole('button', {
      name: `${pokemonCategory}`,
    });
    expect(searchButton).toBeInTheDocument();

    userEvent.click(searchButton);
    const searchPokemon = screen.getByText(`${pokemonName}`);
    expect(searchPokemon).toBeInTheDocument();
  });
});

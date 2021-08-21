import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando a componente Pokedex', () => {
  it('A página deve conter um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const header = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(header).toBeInTheDocument();
  });

  it('Ao clicar no botão próximo pokémon, este deve ser exibido', () => {
    renderWithRouter(<App />);
    const nextPokemonBtn = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    fireEvent.click(nextPokemonBtn);
    const nextPokemonName = screen.getByText('Charmander');
    expect(nextPokemonName).toBeInTheDocument();
    const pokemons = screen.getAllByTestId('pokemon-name');
    expect(pokemons.length).toEqual(1);
  });

  it('A pokédex deve ter botões de filtro', () => {
    renderWithRouter(<App />);
    const attButtons = screen.getAllByTestId('pokemon-type-button');
    const attLength = 7;
    expect(attButtons.length).toEqual(attLength);
  });

  it('Depois de selecionar um elemento a Pokédex deve circular só por esse elem', () => {
    renderWithRouter(<App />);
    const psychicBtn = screen.getByRole('button', { name: 'Psychic' });
    const nextPokemonBtn = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    fireEvent.click(psychicBtn);
    const alakazam = screen.getByText('Alakazam');
    expect(alakazam).toBeInTheDocument();
    fireEvent.click(nextPokemonBtn);
    const mew = screen.getByText('Mew');
    expect(mew).toBeInTheDocument();
    fireEvent.click(nextPokemonBtn);
    expect(alakazam).toBeInTheDocument();
  });

  it('A pokédex deve conter um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByText('All');
    expect(allBtn).toBeInTheDocument();
    fireEvent.click(allBtn);
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
});

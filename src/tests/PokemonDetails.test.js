import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import data from '../data';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  const showPokemon = data[0];
  const favorite = false;
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${showPokemon.id}`);
  });

  it('Exibe texto "<name> Details".', () => {
    const h2 = screen.getByRole('heading', {
      level: 2,
      name: `${showPokemon.name} Details`,
    });
    expect(h2).toBeInTheDocument();
  });
  it('Exibe texto "Summary".', () => {
    const h2 = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(h2).toBeInTheDocument();
  });
  it('Não deve existir o link para Detalhes', () => {
    expect(screen.queryByText(/More details/i)).not.toBeInTheDocument();
  });
  it('Exibe um resumo do Pokémon.', () => {
    expect(screen.getByText(showPokemon.summary)).toBeInTheDocument();
  });
  it('Possuir título para localizações.', () => {
    const h2 = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${showPokemon.name}`,
    });
    expect(h2).toBeInTheDocument();
  });
  it('Todas as localizações do Pokémon devem ser mostradas na seção de detalhes', () => {
    const locations = screen.getAllByAltText(`${showPokemon.name} location`).length;
    expect(locations).toBe(showPokemon.foundAt.length);

    // Verifica se exibe os nomes
    showPokemon.foundAt.forEach((local) => {
      expect(screen.getByText(local.location)).toBeInTheDocument();
    });
  });
});
// it('', () => {});

import React from 'react';
import { Router } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Test PokemonDetails.js', () => {
  beforeEach(() => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    history.push('/pokemons/148');
  });

  test('Se os detalhes do Pokémon selecionado são mostradas na tela.', () => {
    const header = screen.getByRole('heading', {
      name: /dragonair details/i,
      level: 2,
    });
    expect(header).toBeInTheDocument();

    const summary = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(summary).toBeInTheDocument();

    const details = screen.getByText(/the weather will begin to change instantly./i);
    expect(details).toBeInTheDocument();
  });

  test('Se existe seção com os mapas contendo as localizações do pokémon', () => {
    const header = screen.getByRole('heading', {
      name: /game locations of dragonair/i,
      level: 2,
    });
    expect(header).toBeInTheDocument();

    const maps = screen.getAllByAltText('Dragonair location');
    expect(maps[0].src).toContain('https://cdn2.bulbagarden.net/upload/2/21/Johto_Route_45_Map.png');
    expect(maps[1].src).toContain('https://cdn2.bulbagarden.net/upload/1/1e/Johto_Dragons_Den_Map.png');

    const mapTitle = screen.getByText('Johto Route 45');
    expect(mapTitle).toBeInTheDocument();
  });

  test('Se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const favoriteCheckbox = screen.getByRole('checkbox');
    expect(favoriteCheckbox).toBeInTheDocument();

    const favoriteText = screen.getByText('Pokémon favoritado?');
    expect(favoriteText).toBeInTheDocument();

    fireEvent.click(favoriteCheckbox);

    const favoriteIcon = screen.getByAltText('Dragonair is marked as favorite');
    expect(favoriteIcon).toBeInTheDocument();

    fireEvent.click(favoriteCheckbox);
    expect(favoriteIcon).not.toBeInTheDocument();
  });
});

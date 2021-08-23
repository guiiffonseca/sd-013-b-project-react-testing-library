import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testes do component <PokemonDetails.js />', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('pokemons/25');
  });

  test('Se os detalhes do Pokémon selecionado são mostradas na tela.', () => {
    expect(screen.getByRole('heading', { name: 'Pikachu Details', level: 2 }));

    const linkMoreDetails = screen.queryByText('More details');
    expect(linkMoreDetails).toBeNull();

    expect(screen.getByRole('heading', { name: 'Summary', level: 2 }))
      .toBeInTheDocument();

    expect(screen.getByText(/this intelligent/i)).toBeInTheDocument();
  });

  test('Se existe uma seção com os mapas contendo as localizações do pokémon', () => {

    expect(screen.getByText(/Game Locations of Pikachu/i)).toBeInTheDocument();
    expect(screen.getAllByAltText('Pikachu location')[0].src).toContain('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });

  test('Se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    userEvent.click(screen.getByRole('checkbox', { checked: false }));
    expect(screen.getByRole('checkbox', { checked: true })).toBeInTheDocument();
    expect(screen.getByAltText('Pikachu is marked as favorite')).toBeInTheDocument();
  });
});

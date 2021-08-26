import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente Pokemon.js', () => {
  test('testa se é renderizado o card do pokemon', () => {
    renderWithRouter(<App />);
    const linkToDetails = screen.getByRole('link', { name: /more details/i });
    expect(linkToDetails).toBeInTheDocument();

    userEvent.click(linkToDetails);
    const verifyText = screen.getByRole('heading', { level: 2, name: /summary/i });
    expect(verifyText).toBeInTheDocument();

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.innerHTML).toBe('Electric');
  });

  test('verifica se o card pokemon renderiza o icon de favorito', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const favButton = screen.getByRole('checkbox');
    expect(favButton).toBeInTheDocument();

    userEvent.click(favButton);
    const favIcon = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(favIcon).toBeInTheDocument();
    console.log(favIcon.src);
    expect(favIcon.src).toBe('http://localhost/star-icon.svg');
  });
  test('verifica se o card pokemon renderiza a img do pokemon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const imgPokemon = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(imgPokemon).toBeInTheDocument();
    expect(imgPokemon.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
});

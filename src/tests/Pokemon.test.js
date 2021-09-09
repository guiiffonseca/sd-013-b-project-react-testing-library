import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('test Card Pokemons', () => {
  test('Verificar as informacoes do card', () => {
    renderWithRouter(<App />);

    const btnElectric = screen.getByRole('button', {
      name: /Electric/i,
    });
    userEvent.click(btnElectric);
    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon.innerHTML).toBe('Pikachu');
    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon.innerHTML).toBe('Electric');
    const average = screen.getByText(/Average weight/i);
    expect(average).toBeInTheDocument();
    const valueWeight = screen.getByText(/6.0/i);
    expect(valueWeight).toBeInTheDocument();
    const unidade = screen.getByText(/kg/i);
    expect(unidade).toBeInTheDocument();
    const imgPokemon = screen.getByRole('img');
    expect(imgPokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imgPokemon).toHaveAttribute('alt', 'Pikachu sprite');
  });
  test('Verifica se contem o more dethils ', () => {
    const { history } = renderWithRouter(<App />);
    const btnDetails = screen.getByRole('link', {
      name: /More details/i,
    });
    expect(btnDetails).toBeInTheDocument();
    userEvent.click(btnDetails);
    const checkboxFavorite = screen.getByRole('checkbox');
    expect(checkboxFavorite).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    userEvent.click(checkboxFavorite);
    const imgStar = screen.getByAltText('Pikachu is marked as favorite');
    expect(imgStar).toBeInTheDocument();
    expect(imgStar).toHaveAttribute('src', '/star-icon.svg');
  });
});

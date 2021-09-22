import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../Uteis/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

// Recebi ajuda do Gênesis Henriques, Matheus Figueiredo, Gabriel Ribeiro e Gustavo Alves para desenvolver esse projeto https://github.com/GenesisHenriques, https://github.com/mathfigueiredo, https://github.com/Gribeir0, https://github.com/gustavoalves23

describe('Testa o componente FavoritePokemons', () => {
  it('Testa se o texto "No favorite pokemon found" é exibido', () => {
    renderWithRouter(<FavoritePokemons />);
    const textP = screen.getByText('No favorite pokemon found');
    expect(textP).toBeInTheDocument();
  });

  it('Testa se todos os pokemons favoritados aparececem', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const FavCheckbox = screen.getByRole('checkbox', { name: /Pokémon favoritado?/ });
    fireEvent.click(FavCheckbox);
    history.push('/favorites');
    const namePokemon = screen.getByText(/Pikachu/i);
    expect(namePokemon).toBeInTheDocument();
  });
});

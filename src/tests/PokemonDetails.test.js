import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente PokemonDetails.', () => {
  const MORE_DETAILS = 'More details';

  it('Testa se as infos detalhadas do Pokémon selecionado são mostradas.', () => {
    renderWithRouter(<App />);
    const detalhes = screen.getByText(MORE_DETAILS);
    fireEvent.click(detalhes);
    expect(detalhes).toBeEnabled();

    const pokemonDetails = screen.getByText('Pikachu Details');
    expect(pokemonDetails).toBeInTheDocument();

    const h2 = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(h2).toBeInTheDocument();

    const paragraphy = screen.getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(paragraphy).toBeInTheDocument();
  });

  it('Testa se o usuário pode favoritar um pokémon na página de detalhes.', () => {
    renderWithRouter(<App />);
    const detalhes = screen.getByText(MORE_DETAILS);
    fireEvent.click(detalhes);

    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();
    fireEvent.click(checkbox);

    const pokemonFavorite = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(pokemonFavorite).toBeInTheDocument();
    fireEvent.click(checkbox);
    expect(pokemonFavorite).toBeEnabled();
  });

  it('Testa na página há os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const detalhes = screen.getByText(MORE_DETAILS);
    fireEvent.click(detalhes);

    const h2 = screen.getByRole('heading', {
      level: 2, name: 'Game Locations of Pikachu' });
    expect(h2).toBeInTheDocument();

    const local = screen.getAllByRole('img', { name: 'Pikachu location' });
    expect(local).toHaveLength(2);
    expect(local[0]).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });
});

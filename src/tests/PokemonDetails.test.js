import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import pokemon from '../data';
import App from '../App';

describe('Teste o componente Pokemon Details', () => {
  test('se as informações detalhadas do Pokémon são mostradas na tela.', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText(/More details/);
    fireEvent.click(moreDetails);
    const pokeName = screen.getByText(/Pikachu Details/);
    const h2 = screen.getByText(/Summary/);
    const details = screen.getByText(pokemon[0].summary);
    expect(pokeName).toBeInTheDocument();
    expect(h2).toBeInTheDocument();
    expect(details).toBeInTheDocument();
  });
  test('se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText(/More details/);
    fireEvent.click(moreDetails);
    const h2 = screen.getByText(/Game Locations of Pikachu/);
    const locations = screen.getAllByRole('img', { name: /Pikachu location/ });
    expect(h2).toBeInTheDocument();
    expect(locations).toHaveLength(2);
    expect(locations[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locations[0]).toHaveAttribute('alt', 'Pikachu location');
  });
  test('se o usuário pode favoritar um pokémon através da página de detalhes.', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText(/More details/);
    fireEvent.click(moreDetails);
    const favPoke = screen.getByText(/Pokémon favoritado?/);
    fireEvent.click(favPoke);
    const star = screen.getByRole('img', { name: /Pikachu is marked as favorite/ });
    expect(star).toBeInTheDocument();
    expect(star).toHaveAttribute('src', '/star-icon.svg');
    expect(star).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});

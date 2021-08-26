import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o funcionamento do componente PokemonDetails', () => {
  it('Verifica se exibe os detalhes das informações', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /More Details/i });
    fireEvent.click(detailsLink);
    const details = screen.getByText(/Details/i);
    expect(details.innerHTML).toBe('Pikachu Details');
    expect(screen.queryByText(/More Details/i)).not.toBeInTheDocument();
    const getsummaryText = screen.getByRole('heading', { name: /Summary/i });
    expect(getsummaryText).toBeInTheDocument();
    const getText = screen.getByText(/This intelligent/i);
    expect(getText).toBeInTheDocument();
  });

  it('Verifica se mostra os mapas', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /More Details/i });
    fireEvent.click(detailsLink);
    const image = screen.getAllByRole('img');
    expect(image[1].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(image[1].alt).toBe('Pikachu location');
  });

  it('Verifica se exibe checkbox', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /More Details/i });
    fireEvent.click(detailsLink);
    const checkbox = screen.getByLabelText(/Pokémon favoritado/i);
    expect(checkbox).toBeInTheDocument();
    fireEvent.click(checkbox);
    const image = screen.getAllByRole('img');
    expect(image[1].src).toContain('star-icon.svg');
    expect(image[1].alt).toBe('Pikachu is marked as favorite');
    const heading = screen.getByRole('heading', { name: /Game locations of pikachu/i });
    expect(heading).toBeInTheDocument();
    const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    fireEvent.click(favoriteLink);
    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});

import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import RenderWithRouter from './utils/RenderWithRouter';
import App from '../App';

describe('Testando Pokemon Details', () => {
  const detaisText = 'More details';

  test('Testa existencia do titulo', () => {
    RenderWithRouter(<App />);
    fireEvent.click(screen.getByText(detaisText));

    expect(screen.getByText('Pikachu Details')).toBeInTheDocument();
  });

  test('Testa existencia cartao pokemon', () => {
    RenderWithRouter(<App />);
    fireEvent.click(screen.getByText(detaisText));
    const immages = screen.getAllByRole('img');
    expect(screen.getByTestId('pokemon-type')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-weight')).toBeInTheDocument();
    expect(immages[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Verifica existencia texto Summary', () => {
    RenderWithRouter(<App />);
    fireEvent.click(screen.getByText(detaisText));

    const text = /This intelligent Pokémon roasts hard/i;
    expect(screen.getByText('Summary')).toBeInTheDocument();
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  test('Testa game locations', () => {
    RenderWithRouter(<App />);
    fireEvent.click(screen.getByText(detaisText));
    const immages = screen.getAllByRole('img');

    expect(screen.getByText('Game Locations of Pikachu')).toBeInTheDocument();

    expect(immages[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(immages[1]).toHaveAttribute('alt', 'Pikachu location');
    expect(screen.getByText('Kanto Viridian Forest')).toBeInTheDocument();

    expect(immages[2]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(immages[2]).toHaveAttribute('alt', 'Pikachu location');
    expect(screen.getByText('Kanto Power Plant')).toBeInTheDocument();
  });

  test('Testa existencia Checkbox', () => {
    RenderWithRouter(<App />);
    fireEvent.click(screen.getByText(detaisText));

    expect(screen.getByText('Pokémon favoritado?')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });
});

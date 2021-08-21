import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Details page tests', () => {
  beforeEach(() => renderWithRouter(<App />));

  test('If the detail page has the correct infos', () => {
    const name = screen.getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('Pikachu');
    const details = screen.getByRole('link', { name: /details/i });
    expect(details).toBeInTheDocument();
    userEvent.click(details);

    const title = screen.getByRole('heading', { level: 2, name: /details/i });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Pikachu Details');
    expect(details).not.toBeInTheDocument();
    const summary = screen.getByRole('heading', { level: 2, name: /summary/i });
    expect(summary).toBeInTheDocument();
    const paragraph = screen.getByText(/this intelligent Pokémon/i);
    expect(paragraph).toBeInTheDocument();

    const mapTitle = screen.getByRole('heading', { level: 2, name: /locations/i });
    expect(mapTitle).toBeInTheDocument();
    expect(mapTitle).toHaveTextContent(/pikachu/i);
    const locationsText = screen.getAllByText(/kanto/i);
    expect(locationsText).toHaveLength(2);
    const locationsImage = screen.getAllByAltText(/location/i);
    expect(locationsImage).toHaveLength(2);
    const URLs = ['https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png'];
    locationsImage.forEach((img, index) => {
      expect(img.src).toBe(URLs[index]);
      expect(img.alt).toBe('Pikachu location');
    });
  });

  test('If the favorite checkbox its working', () => {
    const name = screen.getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('Pikachu');
    const details = screen.getByRole('link', { name: /details/i });
    expect(details).toBeInTheDocument();
    userEvent.click(details);

    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    userEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });
});

import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../components';
import renderWithRouter from './helper/renderWithRouter';

describe('Test About component', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });
  test('if the page contain pokedex information', () => {
    expect(screen.getByText(/This application simulates a Pokédex/)).toBeInTheDocument();
  });
  test('if the page contains a h2', () => {
    expect(screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    })).toBeInTheDocument();
  });
  test('if there is two "p" whit text', () => {
    expect(screen.getAllByText(/pokémons/i).length).toBe(2);
  });
  test('if the page contains a src whit a img', () => {
    const imgScreen = screen.getByRole('img');
    expect(imgScreen).toBeInTheDocument();
    expect(imgScreen).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

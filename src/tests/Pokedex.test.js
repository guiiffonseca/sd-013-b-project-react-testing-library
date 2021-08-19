import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../Helper/RenderWithRouter';
import App from '../App';

describe('5, testing component pokedex.js', () => {
  it('should contain a h2 with the text encountered pokemons', () => {
    renderWithRouter(<App />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('should render the next pokemon charmander', () => {
    renderWithRouter(<App />);

    const nextBtn = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(nextBtn).toBeInTheDocument();

    userEvent.click(nextBtn);

    const nextPoke = screen.getByText('Charmander');
    expect(nextPoke).toBeInTheDocument();
  });
});

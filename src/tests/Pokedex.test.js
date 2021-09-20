import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import data from '../data';
import App from '../App';

const NEXT_POKEMON = 'next-pokemon';

describe('Teste o componente <Pokedex.js />', () => {
  // it('Possui um Heading h2 com texto Encountered pokémons', () => {}); teste feito no app
  it('Possui um Heading h2 com texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const heading = screen.getByText(/Encountered pokémons/);
    expect(heading).toBeInTheDocument();
  });
  it('Exibe o próximo pokémon', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId(NEXT_POKEMON)).toHaveTextContent('Próximo pokémon');

    userEvent.click(screen.getByTestId(NEXT_POKEMON));
    expect(screen.getByText('Charmander'));

    for (let i = 1; i <= data.length - 1; i += 1) {
      userEvent.click(screen.getByTestId(NEXT_POKEMON));
    }
    expect(screen.getByText('Pikachu'));
  });
  /* it('Exibe o próximo pokémon', () => {
    renderWithRouter(<App />);

  }); */
});

import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Testa a pagina de pokedex', () => {
  it('contem um heading', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(heading).toBeInTheDocument();
  });

  it('Testa os botoes de filtrar pelo tipo de pokemon', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: 'All' });
    const fireButton = screen.getByRole('button', { name: 'Fire' });
    const pokeName = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');

    fireEvent.click(allButton);

    expect(pokeName).toHaveTextContent('Pikachu');
    expect(type).toHaveTextContent('Electric');
    expect(screen.getByAltText('Pikachu sprite')).toBeInTheDocument();

    fireEvent.click(fireButton);

    expect(pokeName).toHaveTextContent('Charmander');
    expect(type).toHaveTextContent('Fire');
    expect(screen.getAllByAltText('Charmander sprite'));
  });

  it('Verifica se a página contém todos botões de filtro', () => {
    renderWithRouter(<App />);
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    const buttonAmount = 7;
    expect(typeButtons.length).toBe(buttonAmount);
  });
});

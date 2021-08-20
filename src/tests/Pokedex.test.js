import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './router/renderWithRouter';
import App from '../App';

describe('Testa componente Pokedex', () => {
  test('verifica se a página possui Encountered pokémons', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('heading', {
      name: /Encountered pokémons/,
    }));
  });

  test('verifica se é exibido o próximo pokemon quando clicado o botão', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByText('Próximo pokémon');
    expect(nextButton).toBeInTheDocument();
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    userEvent.click(nextButton);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    const numberOfClicks = 7;
    for (let i = 1; i <= numberOfClicks + 1; i += 1) {
      userEvent.click(nextButton);
    }
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
  /*
  test('verifica se aparece apenas um pokemon por vez', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByText('Próximo pokémon');
    expect(nextButton).toBeInTheDocument();
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.queryByText('Charmander')).not.toBeInTheDocument();
  });

  test('verifica se aparecem os botões de filtro na tela', () => {
    renderWithRouter(<App />);
    const allButtons = screen.getAllByRole('button');
    const lenghtOfArray = 9;
    expect(allButtons).toHaveLength(lenghtOfArray);

    const fireButton = screen.getByText('Fire');
    const nextPoke = screen.getByTestId('next-pokemon');
    expect(fireButton).toHaveTextContent('Fire');
    userEvent.click(fireButton);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    userEvent.click(nextPoke);
    expect(screen.getByText('Rapidash')).toBeInTheDocument();

    expect(screen.getByText('All')).toBeInTheDocument();
  });

  test('verifica se aparecem os botões de filtro na tela', () => {
    renderWithRouter(<App />);
    const allButtons = screen.getAllByRole('button');
    const lenghtOfArray = 9;
    expect(allButtons).toHaveLength(lenghtOfArray);

    const fireButton = screen.getByText('Fire');
    const nextPoke = screen.getByTestId('next-pokemon');
    const allButton = screen.getByText('All');
    expect(fireButton).toHaveTextContent('Fire');
    userEvent.click(fireButton);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    userEvent.click(nextPoke);
    expect(screen.getByText('Rapidash')).toBeInTheDocument();

    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);
    expect(screen.getByAltText('Pikachu sprite')).toBeInTheDocument();
  });
  */
});

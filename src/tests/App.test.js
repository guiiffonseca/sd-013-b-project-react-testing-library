import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa se renderiza o Componente App corretamente', () => {
  test('Se existe um link com o texto Home, na tela', () => {
    renderWithRouter(<App />);

    const link1 = screen.getByRole('link', {
      name: /Home/i,
    });
    expect(link1).toBeInTheDocument();

    userEvent.click(link1);
    const button = screen.getByText('Próximo pokémon');
    expect(button).toBeInTheDocument();
  });

  test('Se existe um link com o texto About, na tela', () => {
    renderWithRouter(<App />);

    const link2 = screen.getByRole('link', {
      name: /About/i,
    });
    expect(link2).toBeInTheDocument();

    userEvent.click(link2);

    const P = screen.getByText(/This application/i);
    expect(P).toBeInTheDocument();
  });

  test('Se existe um link com o texto Favorite Pokémons, na tela', () => {
    renderWithRouter(<App />);

    const link3 = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    expect(link3).toBeInTheDocument();

    userEvent.click(link3);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: /pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('redireciona para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/nham');

    const Not = screen.getByRole('heading', {
      level: 2,
      name: /found/i,
    });

    expect(Not).toBeInTheDocument();
  });
});

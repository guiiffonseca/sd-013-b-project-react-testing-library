import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import renderWithRouter from './router/renderWithRouter';
import App from '../App';

describe('Testa o componente Pokemon', () => {
  test('verifica se é renderizado um card com as informações do pokémon', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Pikachu/)).toBeInTheDocument();
    expect(screen.getAllByText('Electric')[0]).toBeInTheDocument();
    expect(screen.getByText(/Average weight/)).toBeInTheDocument();
    expect(screen.getByAltText('Pikachu sprite')).toBeInTheDocument();
  });
});

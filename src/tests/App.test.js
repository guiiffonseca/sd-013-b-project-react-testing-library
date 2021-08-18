import React from 'react';
// import { fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('testa o componente App', () => {
  test('teste se o topo da aplicação contém conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const home = screen.getByText(/Home/);
    expect(home).toBeInTheDocument();

    const about = screen.getByText(/About/);
    expect(about).toBeInTheDocument();

    const favorite = screen.getByText(/Favorite Pokémons/);
    expect(favorite).toBeInTheDocument();
  });

  test('teste se aplicação é redirecionada para pág. inicial ao clicar link Home', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', {
      name: '/',
    });
    userEvent.click(linkHome);
    expect(linkHome).toBeInTheDocument();
  });
});

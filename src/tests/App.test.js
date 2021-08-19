import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste do componente App', () => {
  it('Existe um conjunto de links no topo da navegação', () => {
    render(<App />);

    const linkToHome = screen.getByText('Home');
    const linkToAbout = screen.getByText('About');
    const linkToFavorites = screen.getByText('Favorite Pokémons');

    expect(linkToHome).toBeInTheDocument();
    expect(linkToAbout).toBeInTheDocument();
    expect(linkToFavorites).toBeInTheDocument();
  });

  it('Ao clicar em Home a aplicação deve ser redirecionada à sua página inicial', () => {
    const { history } = renderWithRouter(<App />);

    const linkToHome = screen.getByText('Home');
    const { location: { pathname } } = history;

    userEvent.click(linkToHome);
    expect(pathname).toBe('/');
  });
  it('Ao clicar em About a aplicação deve ser redirecionada à página About', () => {
    const { history } = renderWithRouter(<App />);
    const linkToAbout = screen.getByText('About');

    const { location: { pathname } } = history;
    userEvent.click(linkToAbout);
    expect(pathname).toBe('/about');
  });
});

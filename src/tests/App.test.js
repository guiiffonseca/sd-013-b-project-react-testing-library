import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Testa a página principal', () => {
  it('Testa se a página inicial contém os links Home, About e Favorite Pokémon', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByText(/Home/);
    const aboutLink = screen.getByText(/About/);
    const favoriteLink = screen.getByText(/Favorite Pokémons/);

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  it('Testa se renderiza o componente Home', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByText(/Home/);

    fireEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });

  it('Testa se renderiza o componente About', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });

    fireEvent.click(aboutLink);
    const aboutText = screen.getByText('About Pokédex');
    expect(aboutText).toBeInTheDocument();
    expect(history.location.pathname).toBe('/about');
  });

  it('Testa se renderiza o componente Favorites', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

    fireEvent.click(favoriteLink);
    const favoriteText = screen.getByText('Favorite Pokémons');
    expect(favoriteText).toBeInTheDocument();
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Testa se renderiza Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/paginaInexistente');
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});

import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import RenderWithRouter from './utils/RenderWithRouter';
import App from '../App';

describe('Testando Nav', () => {
  test('Testando se nav existe', () => {
    RenderWithRouter(<App />);
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  test('Testa se existe 3 textos', () => {
    RenderWithRouter(<App />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  test('Testando funcionalidade do botão Home', () => {
    const { history } = RenderWithRouter(<App />);
    const { pathname } = history.location;
    const homeButton = screen.getByText('Home');

    fireEvent.click(homeButton);
    expect(pathname).toBe('/');
  });

  test('Testando funcionalidade do botão About', () => {
    const { history } = RenderWithRouter(<App />);
    const aboutButton = screen.getByText('About');

    fireEvent.click(aboutButton);
    expect(history.location.pathname).toBe('/about');
  });

  test('Testando funcionalidade do botão Favoritos', () => {
    const { history } = RenderWithRouter(<App />);
    const favButton = screen.getByText('Favorite Pokémons');

    fireEvent.click(favButton);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Testa existencia pagina Not Fount', () => {
    const { history } = RenderWithRouter(<App />);
    history.push('/testeTeste');
    expect(screen.getByText('Page requested not found')).toBeInTheDocument();
  });
});

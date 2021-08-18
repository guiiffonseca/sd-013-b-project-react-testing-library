import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';

describe('Verifica o componente App', () => {
  it('Verifica se o primeiro link possui o texto "Home"', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);
  });

  it('Verifica se o segundo link possui o texto "About"', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByText(/About/i);
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);
  });

  it('Verifica se o terceiro link possui o texto "Favorite Pokémons"', () => {
    renderWithRouter(<App />);
    const favpokLink = screen.getByText(/Favorite Pokémons/i);
    expect(favpokLink).toBeInTheDocument();
    userEvent.click(favpokLink);
  });
});

describe('routes', () => {
  it('Verifica se ao clicar em Home, a página é redirecionada para inicial', () => {
    const { getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText(/Home/i));
    const pathName = history.location.pathname;
    expect(pathName).toBe('/');
  });

  it('Verifica se ao clicar em About, a página é redirecionada para /about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText(/About/i));
    const pathName = history.location.pathname;
    expect(pathName).toBe('/about');
  });

  it('Verifica ao clicar em Favorite Pokémons, é redirecionada para /favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText(/Favorite Pokémons/i));
    const pathName = history.location.pathname;
    expect(pathName).toBe('/favorites');
  });

  it('Verifica se ao digitar URL desconhecida, é redirecionada para Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablaustico');
    const pageNotFoundText = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(pageNotFoundText).toBeInTheDocument();
  });
});

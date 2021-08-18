import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste App ', () => {
  test('os links estão aparecendo', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByText('Home');
    expect(linkHome).toBeInTheDocument();

    const linkAbout = screen.getByText('About');
    expect(linkAbout).toBeInTheDocument();

    const linkFavorite = screen.getByText('Favorite Pokémons');
    expect(linkFavorite).toBeInTheDocument();
  });

  test('clica no link Home', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByText('Home');
    userEvent.click(linkHome);
    const TextHome = screen.getByText('Encountered pokémons');
    expect(TextHome).toBeInTheDocument();
  });

  test('clica no link About', () => {
    // render(<MemoryRouter><App /></MemoryRouter>);
    renderWithRouter(<App />);
    const linkAbout = screen.getByText('About');
    userEvent.click(linkAbout);
    const TextAbout = screen.getByText('About Pokédex');
    expect(TextAbout).toBeInTheDocument();
  });

  test('clica no link Favorite Pokémons', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    const linkFavorite = screen.getByText('Favorite Pokémons');
    userEvent.click(linkFavorite);
    const TextFavorite = screen.getByText('Favorite pokémons');
    expect(TextFavorite).toBeInTheDocument();
  });

  test('Pagina não encontrada', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/qualquer-coisa');

    const TextPageNotFound = screen.getByText('Page requested not found');
    expect(TextPageNotFound).toBeInTheDocument();
  });
});

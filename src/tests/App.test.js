import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('app test', () => {
  test('renderiza o link about', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const linkAbout = screen.getByRole('link', {
      name: /about/i,
    });
    expect(linkAbout).toBeInTheDocument();
    userEvent.click(linkAbout);

    const searchTitle = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(searchTitle).toBeInTheDocument();
  });

  test('renderiza o link favorite', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const linkFavorite = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(linkFavorite).toBeInTheDocument();
    userEvent.click(linkFavorite);

    const searchTitle = screen.getByRole('heading', {
      level: 2,
      name: 'Favorite pokémons',
    });
    expect(searchTitle).toBeInTheDocument();
  });

  test('renderiza o link home', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const linkHome = screen.getByRole('link', {
      name: /home/i,
    });
    expect(linkHome).toBeInTheDocument();
    userEvent.click(linkHome);

    const searchTitle = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(searchTitle).toBeInTheDocument();
  });

  test('renderiza o link more details e o input', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const linkDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);

    const searchTitle = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    expect(searchTitle).toBeInTheDocument();

    const searchInput = screen.getByRole('checkbox');
    expect(searchInput).toBeInTheDocument();
    userEvent.click(searchInput);
    expect(searchInput).toBeChecked();
  });
});

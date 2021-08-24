import React from 'react';
import { screen, render, within } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Requisito 1 - App.js test', () => {
  test('testando a renderização dos links da nav', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const nav = screen.getByRole('navigation');
    const navLinks = within(nav).getAllByRole('link');
    const navLength = 3;
    expect(navLinks.length).toBe(navLength);

    const home = screen.getByRole('link', {
      name: /home/i,
    });
    expect(home).toBe(navLinks[0]);

    const about = screen.getByRole('link', {
      name: /about/i,
    });
    expect(about).toBe(navLinks[1]);

    const favoritePokemons = screen.getByRole('link', {
      name: /favorite/i,
    });
    expect(favoritePokemons).toBe(navLinks[2]);
  });
  test('testando a rota do link home', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const home = screen.getByRole('link', {
      name: /home/i,
    });
    const leftClick = { button: 0 };
    userEvent.click(home, leftClick);
    const homeText = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });

    expect(homeText).toBeInTheDocument();
  });
  test('testando a rota do link about', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const about = screen.getByRole('link', {
      name: /about/i,
    });
    const leftClick = { button: 0 };
    userEvent.click(about, leftClick);
    const aboutText = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });

    expect(aboutText).toBeInTheDocument();
  });
  test('testando a rota do link favorite', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const favorite = screen.getByRole('link', {
      name: /favorite/i,
    });
    const leftClick = { button: 0 };
    userEvent.click(favorite, leftClick);
    const favoriteText = screen.getByRole('heading', {
      level: 2,
      name: /favorite/i,
    });

    expect(favoriteText).toBeInTheDocument();
  });
  test('testando a rota not found', () => {
    const history = createMemoryHistory();
    history.push('/someting-Bad');
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const notFound = screen.getByRole('heading', {
      level: 2,
      name: /not found/i,
    });

    expect(notFound).toBeInTheDocument();
  });
});

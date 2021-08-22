import React from 'react';
// import { Router } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
// import { createMemoryHistory } from 'history';
// import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  test('O primeiro link deve possuir o texto "Home"', () => {
    const { history } = renderWithRouter(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    history.push('/');

    const linkHomeText = screen.getByRole('link', {
      name: 'Home',
    });
    expect(linkHomeText).toBeInTheDocument();

    userEvent.click(linkHomeText);
    const homePageText = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(homePageText).toBeInTheDocument();
  });

  test('O segundo link deve possuir o texto "About"', () => {
    const { history } = renderWithRouter(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    history.push('/');

    const linkAboutText = screen.getByRole('link', {
      name: 'About',
    });
    expect(linkAboutText).toBeInTheDocument();

    userEvent.click(linkAboutText);
    const AboutPageText = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(AboutPageText).toBeInTheDocument();
  });

  test('O terceiro link deve possuir o texto "Favorite Pokémons"', () => {
    const { history } = renderWithRouter(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    history.push('/');

    const linkFavoritePokemonText = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(linkFavoritePokemonText).toBeInTheDocument();

    userEvent.click(linkFavoritePokemonText);
    const AboutPageText = screen.getByRole('heading', {
      level: 2,
      name: 'Favorite pokémons',
    });
    expect(AboutPageText).toBeInTheDocument();
  });
});

import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('tests on the App.test.js', () => {
  test('if the page shows the Home text', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', {
      name: /Home/i,
    });
    // const pokedexText = screen.getByRole('heading', {
    //   level: 1,
    //   name: /pokédex/i,
    // });
    // expect(pokedexText).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
  });

  test('if the page shows the About text', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', {
      name: /About/i,
    });
    expect(aboutLink).toBeInTheDocument();
  });

  test('if the page shows the Favorite Pokemon text', () => {
    renderWithRouter(<App />);
    const favoritePokemonLink = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    expect(favoritePokemonLink).toBeInTheDocument();
  });

  test('if the "/" component is rendered when the Home button is clicked', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('if the "/about" component is rendered when the About button is clicked', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test(
    'if the "/favorites" component is rendered when the Favorite button is clicked',
    () => {
      const { history } = renderWithRouter(<App />);
      fireEvent.click(screen.getByText(/Favorite Pokémons/i));
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    },
  );

  test(
    'if the page not found component is rendered when a wrong URL is requested', () => {
      const { history } = renderWithRouter(<App />);
      history.push('/pagina/que-nao-existe/');
      const noMatch = screen.getByText(/Page requested not found/i);
      expect(noMatch).toBeInTheDocument();
    },
  );
});

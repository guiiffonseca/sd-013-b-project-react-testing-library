import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Application navigation links testing', () => {
  it('contains "Home", "About" and "Favorite Pokemons"', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const homeLinkText = screen.getByRole('link', {
      name: /Home/i,
    });
    expect(homeLinkText).toBeInTheDocument();
    const aboutLinkText = screen.getByRole('link', {
      name: /about/i,
    });
    expect(aboutLinkText).toBeInTheDocument();
    const favoriteLinkText = screen.getByRole('link', {
      name: /Favorite/i,
    });
    expect(favoriteLinkText).toBeInTheDocument();
  });
  it('"Home" link redirects to "/" path', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(homeLink);
    const homePage = screen.getByRole('heading', {
      level: 2,
      name: /encountered/i,
    });
    expect(homePage).toBeInTheDocument();
  });
  it('"About" link redirects to "/about" path', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(aboutLink);
    const aboutPage = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(aboutPage).toBeInTheDocument();
  });
  it('"Favorite Pokémons" link redirects to "/" path', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const favoriteLink = screen.getByRole('link', {
      name: /favorite/i,
    });
    userEvent.click(favoriteLink);
    const favoritePage = screen.getByRole('heading', {
      level: 2,
      name: /favorite pokémons/i,
    });
    expect(favoritePage).toBeInTheDocument();
  });
  it('unknown URL redirects to "NotFound" path', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    customHistory.push('/nonexistent-route');
    const pageNotFound = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found /i,
    });
    expect(pageNotFound).toBeInTheDocument();
  });
});

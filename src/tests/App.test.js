import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Testes da tela App', () => {
  it('Renders App', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const home = screen.getByRole('link', {
      name: 'Home',
    });
    const about = screen.getByRole('link', {
      name: 'About',
    });
    const favorite = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(home && about && favorite).toBeInTheDocument();
  });
});

describe('Redirect Tests', () => {
  it('Redirect to Home', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const home = screen.getByRole('link', {
      name: 'Home',
    });
    userEvent.click(home);
    expect(screen.getByText('Encountered pokémons')).toBeInTheDocument();
  });
  it('Redirect to About', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const about = screen.getByRole('link', {
      name: 'About',
    });
    userEvent.click(about);
    expect(screen.getByText('About Pokédex')).toBeInTheDocument();
  });
  it('Redirect to Favorite Pokémons', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const favorite = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    userEvent.click(favorite);
    const favHeading = screen.getByRole('heading', {
      level: 2,
      name: 'Favorite pokémons',
    });
    expect(favHeading).toBeInTheDocument();
  });
});

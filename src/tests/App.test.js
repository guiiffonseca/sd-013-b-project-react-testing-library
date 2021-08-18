import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from '../App';

describe('Testing App', () => {
  it('Should be have home', () => {
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

    const pokemon = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(pokemon).toBeInTheDocument();
  });
});

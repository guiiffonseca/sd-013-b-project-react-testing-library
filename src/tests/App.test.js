import React from 'react';
import { render, screen } from '@testing-library/react';
/* import userEvent from '@testing-library/user-event'; */
import { MemoryRouter } from 'react-router';
import App from '../App';

describe('should render 3 navigation links on top of the application', () => {
  it('renders a link containing text "Home"', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const linkElement = screen.getByText('Home');
    expect(linkElement).toBeInTheDocument();
  });

  it('renders a link containing text "About"', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const linkElement = screen.getByText('About');
    expect(linkElement).toBeInTheDocument();
  });

  it('renders a link containing text "Favorite Pokémons"', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const linkElement = screen.getByText('Favorite Pokémons');
    expect(linkElement).toBeInTheDocument();
  });
});

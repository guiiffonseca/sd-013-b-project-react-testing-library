import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
// import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  it('se contém um conjunto fixo de links de navegação.', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const linkHome = screen.getByRole('link', {
      name: /Home/i,
    });
    expect(linkHome).toBeInTheDocument();

    const linkAbout = screen.getByRole('link', {
      name: /About/i,
    });
    expect(linkAbout).toBeInTheDocument();

    const linkFavorite = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    expect(linkFavorite).toBeInTheDocument();
  });
});

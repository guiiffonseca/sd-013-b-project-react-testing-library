import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('O link com o texto Home deve existir e apontar para o path correto.', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const homeText = screen.getByRole('link', {
    name: /Home/,
  });
  expect(homeText).toBeInTheDocument();
  expect(homeText).toHaveAttribute('href', '/');
});

test('O link com o texto About deve existir e apontar para o path correto.', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const aboutText = screen.getByRole('link', {
    name: /About/,
  });
  expect(aboutText).toBeInTheDocument();
  expect(aboutText).toHaveAttribute('href', '/about');
});
test('O link com o texto Favorite Pokémons deve existir e apontar para o path correto.',
  () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const favPokeText = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(favPokeText).toBeInTheDocument();
    expect(favPokeText).toHaveAttribute('href', '/favorites');
  });

import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({ ...render(<Router history={ history }>{component}</Router>), history });
};

test('o primeiro link encontrado deve ter o texto Home', () => {
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
  const aboutText = screen.getByRole('link', {
    name: /About/,
  });
  expect(aboutText).toBeInTheDocument();
  expect(aboutText).toHaveAttribute('href', '/about');
  const favPokeText = screen.getByRole('link', {
    name: /favorite pokémons/i,
  });
  expect(favPokeText).toBeInTheDocument();
  expect(favPokeText).toHaveAttribute('href', '/favorites');
});

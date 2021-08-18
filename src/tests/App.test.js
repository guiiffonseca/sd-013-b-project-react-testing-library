import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('Teste se o topo da aplicação tem um conjunto fixo de links de navegação.', () => {
  renderWithRouter(<App />);

  const ElementHomeLink = screen.getByRole('link', { name: /home/i });
  expect(ElementHomeLink).toBeInTheDocument();

  const ElementAboutLink = screen.getByRole('link', { name: /about/i });
  userEvent.click(ElementAboutLink);
  const ElementAboutAfterClick = screen.getByText(/About Pokédex/i);
  expect(ElementAboutAfterClick).toBeInTheDocument();

  const ElementFavoritadosLink = screen.getByRole('link', { name: /Favorite/i });
  userEvent.click(ElementFavoritadosLink);
  const ElementFavoritadosAfterClick = screen.getByRole('heading', {
    level: 2,
    name: /Favorite Pokémons/i,
  });
  expect(ElementFavoritadosAfterClick).toBeInTheDocument();

  const { history } = renderWithRouter(<App />);
  history.push('/rota-inexistente');
  const ElementPageNotFound = screen.getByRole('heading', {
    level: 2,
    name: /not found/i,
  });
  expect(ElementPageNotFound).toBeInTheDocument();
});

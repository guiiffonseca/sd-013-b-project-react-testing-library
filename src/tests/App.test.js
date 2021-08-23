import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('1. Teste o componente <App.js />', () => {
  test('Teste se a aplicação é redirecionada para a página inicial.', () => {
    renderWithRouter(<App />);

    const ElementHomeLink = screen.getByRole('link', { name: /home/i });
    expect(ElementHomeLink).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página de About', () => {
    renderWithRouter(<App />);
    const ElementAboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(ElementAboutLink);
    const ElementAboutAfterClick = screen.getByText(/About Pokédex/i);
    expect(ElementAboutAfterClick).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados',
    () => {
      renderWithRouter(<App />);

      const ElementFavoritadosLink = screen.getByRole('link', { name: /Favorite/i });
      userEvent.click(ElementFavoritadosLink);
      const ElementFavoritadosAfterClick = screen.getByRole('heading', {
        level: 2,
        name: /Favorite Pokémons/i,
      });
      expect(ElementFavoritadosAfterClick).toBeInTheDocument();
    });

  test('Teste se a aplicação é redirecionada para a página Not Found.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rota-inexistente');
    const ElementPageNotFound = screen.getByRole('heading', {
      level: 2,
      name: /not found/i,
    });
    expect(ElementPageNotFound).toBeInTheDocument();
  });
});

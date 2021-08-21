import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('testando links do App e sua rotas', () => {
  test('testar se renderiza 3 links, verificar se os links levam para suas rotas destino',
    () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
      const homeLink = screen.getByRole('link', {
        name: /Home/i,
      });
      expect(homeLink).toBeInTheDocument();
      const aboutLink = screen.getByRole('link', {
        name: /About/i,
      });
      expect(aboutLink).toBeInTheDocument();
      const favoriteLink = screen.getByRole('link', {
        name: /Favorite/i,
      });
      expect(favoriteLink).toBeInTheDocument();

      userEvent.click(homeLink);
      const homeText = screen.getByRole('heading', {
        level: 2,
        nome: /Encountered pokémons/i,
      });
      expect(homeText).toBeInTheDocument();

      userEvent.click(aboutLink);
      const aboutText = screen.getByRole('heading', {
        level: 2,
        name: /About Pokédex/i,
      });
      expect(aboutText).toBeInTheDocument();
      userEvent.click(favoriteLink);
      const favoriteText = screen.getByRole('heading', {
        level: 2,
        name: /Favorite pokémons/i,
      });
      expect(favoriteText).toBeInTheDocument();
    });

  test('testar se quando nao for encontrada a pagina renderize o NotFound', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    customHistory.push('/rota-nao-existente');
    const pageNotFoundText = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(pageNotFoundText).toBeInTheDocument();
  });
});

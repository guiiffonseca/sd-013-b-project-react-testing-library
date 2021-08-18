import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './router';
import App from '../App';

describe('Teste de navegação de páginas', () => {
  test('verifica se existe o link para Home e se está funcionando', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const homeLink = screen.getByRole('link', {
      name: /Home/,
    });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);

    expect(screen.getByRole('heading', {
      level: 1,
      name: /Pokédex/,
    })).toBeInTheDocument();
  });

  test('verifica se existe o link para About e se está funcionando', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const aboutLink = screen.getByRole('link', {
      name: /About/,
    });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);

    expect(screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/,
    })).toBeInTheDocument();
  });

  test('verifica se existe o link para About e se está funcionando', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const favoriteLink = screen.getByRole('link', {
      name: /Favorite/,
    });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);

    expect(screen.getByRole('heading', {
      level: 2,
      name: /Favorite pokémons/,
    })).toBeInTheDocument();
  });

  test('verifica se é exibido o texto Not Found ao entrar em uma URL inexistente', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/urldesconhecida');

    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /not found/,
    });
    expect(notFoundText).toBeInTheDocument();
  });
});

import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';

describe(
  'Teste o componente <App.js />', () => {
    test('O primeiro link deve possuir o texto Home.', () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );

      const homeLink = screen.getByRole('link', {
        name: 'Home',
      });
      expect(homeLink).toBeInTheDocument();
    });

    test('O segundo link deve possuir o texto About.', () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );

      const aboutLink = screen.getByRole('link', {
        name: 'About',
      });
      expect(aboutLink).toBeInTheDocument();
    });

    test('O terceiro link deve possuir o texto Favorite Pokémons.', () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );

      const favoriteLink = screen.getByRole('link', {
        name: 'Favorite Pokémons',
      });
      expect(favoriteLink).toBeInTheDocument();
    });

    test(
      'redirecionada para página inicial, ao clicar no link Home da barra de navegação.',
      () => {
        render(
          <MemoryRouter>
            <App />
          </MemoryRouter>,
        );

        const homeLink = screen.getByRole('link', {
          name: 'Home',
        });
        userEvent.click(homeLink);

        const homePageText = screen.getByRole('heading', {
          level: 2,
          name: /encountered/i,
        });

        expect(homePageText).toBeInTheDocument();
      },
    );

    test(
      'redirecionada para página de About, clicar no link About da barra de navegação.',
      () => {
        render(
          <MemoryRouter>
            <App />
          </MemoryRouter>,
        );

        const aboutLink = screen.getByRole('link', {
          name: 'About',
        });
        userEvent.click(aboutLink);

        const aboutPageText = screen.getByRole('heading', {
          level: 2,
          name: /about pokédex/i,
        });

        expect(aboutPageText).toBeInTheDocument();
      },
    );

    test(
      'redirecionada para página de Pokémons Favoritados, clicar na barra de navegação.',
      () => {
        render(
          <MemoryRouter>
            <App />
          </MemoryRouter>,
        );

        const favoriteLink = screen.getByRole('link', {
          name: 'Favorite Pokémons',
        });
        userEvent.click(favoriteLink);

        const favoritePageText = screen.getByRole('heading', {
          level: 2,
          name: /favorite pokémons/i,
        });

        expect(favoritePageText).toBeInTheDocument();
      },
    );

    test(
      'redirecionada para a página Not Found ao entrar em uma URL desconhecida.',
      () => {
        const { history } = renderWithRouter(<App />);
        history.push('/xablau');

        const notFoundPage = screen.getByRole('heading', {
          level: 2,
          name: /page requested not found/i,
        });

        expect(notFoundPage).toBeInTheDocument();
      },
    );
  },
);

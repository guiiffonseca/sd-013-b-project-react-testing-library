import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

// const MAX_LINKS = 4;

describe('<App.js /> Testes', () => {
  test('1) se no topo da aplicação contém um conjunto fixo de links de navegação.',
    () => {
      render(<MemoryRouter><App /></MemoryRouter>);

      const homeLink = screen.getByRole('link', { name: 'Home' });
      const aboutLink = screen.getByRole('link', { name: 'About' });
      const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

      expect(homeLink).toBeInTheDocument();
      expect(aboutLink).toBeInTheDocument();
      expect(favoriteLink).toBeInTheDocument();
    });

  test('2) se a aplicação redireciona para a página inicial clicando no link "Home".',
    () => {
      render(<MemoryRouter><App /></MemoryRouter>);

      const homeLink = screen.getByRole('link', { name: 'Home' });

      userEvent.click(homeLink);

      const homePageText = screen.getByRole('heading', {
        level: 2,
        name: /Encountered pokémons/i,
      });

      expect(homePageText).toBeInTheDocument();
    });

  test('3) se a aplicação redireciona para a página "About" clicando no link "About".',
    () => {
      render(<MemoryRouter><App /></MemoryRouter>);

      const aboutLink = screen.getByRole('link', { name: 'About' });

      userEvent.click(aboutLink);

      const aboutPageText = screen.getByRole('heading', {
        level: 2,
        name: /About Pokédex/i,
      });

      expect(aboutPageText).toBeInTheDocument();
    });

  test('4) se redireciona para a página de favoritos clicando em "Favorite Pokémons".',
    () => {
      render(<MemoryRouter><App /></MemoryRouter>);

      const favoritePokemonLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

      userEvent.click(favoritePokemonLink);

      const favoritePokemonPageText = screen.getByRole('heading', {
        level: 2,
        name: /Favorite pokémons/i,
      });

      expect(favoritePokemonPageText).toBeInTheDocument();
    });

  test('5) se redireciona para a página "Not Found" ao entrar em URL desconhecida.',
    () => {
      const { history } = renderWithRouter(<App />);

      history.push('/URL-desconhecida');

      const pageNotFoundText = screen.getByRole('heading', {
        level: 2,
        name: /Page requested not found/i,
      });

      expect(pageNotFoundText).toBeInTheDocument();
    });

  // });
  // const aboutMeText = screen.getByRole('heading', {
  //   level: 1,
  //   name: /página sobre mim/i,
  // });

  // expect(aboutMeText).toBeInTheDocument();

  // const projectsLink = screen.getByRole('link', {
  //   name: /projetos/i,
  // });
  // userEvent.click(projectsLink);

  // const projectsPageText = screen.getByRole('heading', {
  //   level: 1,
  //   name: /página de projetos/i,
  // });

  // expect(projectsPageText).toBeInTheDocument();
});

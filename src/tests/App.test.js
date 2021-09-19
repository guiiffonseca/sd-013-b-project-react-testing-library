import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('<App.js /> Integration Tests:', () => {
  test('1) Se o topo da aplicação contém um conjunto fixo de links de navegação.',
    () => {
      render(<MemoryRouter><App /></MemoryRouter>);

      const homeLink = screen.getByRole('link', { name: 'Home' });
      const aboutLink = screen.getByRole('link', { name: 'About' });
      const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

      expect(homeLink).toBeInTheDocument();
      expect(aboutLink).toBeInTheDocument();
      expect(favoriteLink).toBeInTheDocument();
    });

  test('2) Se a aplicação é redirecionada para a página inicial,'
  + ' na URL "/" ao clicar no link "Home" da barra de navegação.',
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

  test('3) Se a aplicação é redirecionada para a página de "About",'
  + ' na URL "/about", ao clicar no link "About" da barra de navegação.',
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

  test('4) Se a aplicação é redirecionada para a página de "Pokémons Favoritados",'
  + ' na URL "/favorites", ao clicar no link "Favorite Pokémons" da barra de navegação.',
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

  test('5) Se a aplicação é redirecionada para a página "Not Found"'
  + ' ao entrar em uma URL desconhecida.',
  () => {
    const { history } = renderWithRouter(<App />);

    history.push('/URL-desconhecida');

    const pageNotFoundText = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });

    expect(pageNotFoundText).toBeInTheDocument();
  });
});

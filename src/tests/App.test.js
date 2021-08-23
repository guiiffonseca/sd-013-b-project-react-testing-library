import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

const reactRouterTest = (routeText, toFind) => {
  const { history } = renderWithRouter(<App />);
  const route = screen.getByText(routeText);
  fireEvent.click(route);

  const { pathname } = history.location;
  const found = screen.getByText(toFind);
  return { pathname, found };
};

describe('Testa a renderização do componente App', () => {
  it('Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const nav = screen.getAllByRole('link');

    expect(nav[0].textContent).toBe('Home');
    expect(nav[1].textContent).toBe('About');
    expect(nav[2].textContent).toBe('Favorite Pokémons');
  });

  it('Testa se redireciona para "/" ao clicar em "Home"', () => {
    const { pathname, found } = reactRouterTest('Home', 'Encountered pokémons');

    expect(pathname).toBe('/');
    expect(found).toBeInTheDocument();
  });

  it('Testa se redireciona para "/about" ao clicar em "About"', () => {
    const { pathname, found } = reactRouterTest('About', 'About Pokédex');

    expect(pathname).toBe('/about');
    expect(found).toBeInTheDocument();
  });

  it('Testa se redireciona para "/favorites" ao clicar em "Favorite Pokémons"', () => {
    const { pathname, found } = reactRouterTest('Favorite Pokémons', 'Favorite pokémons');

    expect(pathname).toBe('/favorites');
    expect(found).toBeInTheDocument();
  });
});

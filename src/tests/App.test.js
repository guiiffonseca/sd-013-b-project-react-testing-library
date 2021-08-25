import React from 'react';
import { screen, within, fireEvent } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

function testLink(linkText, headerText) {
  const { history } = renderWithRouter(<App />);
  const link = screen.getByText(linkText);

  fireEvent.click(link);

  const foundText = screen.getByText(headerText);
  const { pathname } = history.location;

  return { foundText, pathname };
}

describe('Testando o App.js', () => {
  test('se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const MAX_LINKS = 3;
    const navigation = screen.getByRole('navigation');
    const navLinks = within(navigation).getAllByRole('link');
    const defaultLinks = ['Home', 'About', 'Favorite Pokémons'];

    expect(navLinks.length).toBe(MAX_LINKS);
    navLinks.forEach((link, index) => {
      expect(link.textContent).toBe(defaultLinks[index]);
    });
  });

  test('se a aplicação é redirecionada corretamente ao clicar no link Home', () => {
    const { foundText, pathname } = testLink('Home', /^Encountered pokémons$/);

    expect(pathname).toBe('/');
    expect(foundText).toBeInTheDocument();
  });

  test('se a aplicação é redirecionada corretamente ao clicar no link About', () => {
    const { foundText, pathname } = testLink('About', /^About Pokédex$/);

    expect(pathname).toBe('/about');
    expect(foundText).toBeInTheDocument();
  });

  test('se a aplicação é redirecionada ao clicar no link Favorite Pokémons', () => {
    const { foundText, pathname } = testLink('Favorite Pokémons', /^Favorite pokémons$/);

    expect(pathname).toBe('/favorites');
    expect(foundText).toBeInTheDocument();
  });

  test('se a aplicação é redirecionada para a página Not Found se necessário', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/test');

    const notFound = screen.getByText(/^Page requested not found.*/);

    expect(notFound).toBeInTheDocument();
  });
});

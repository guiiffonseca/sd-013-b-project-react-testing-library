import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('App.js', () => {
  test(`testa se no topo da aplicação contém um conjunto fixo de links
    de navegaçao com texto "Home", "About", "Favorite Pokémons".`, () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const homeText = screen.getByText('Home');
    expect(homeText).toBeInTheDocument();

    const aboutText = screen.getByText('About');
    expect(aboutText).toBeInTheDocument();

    const favoritePokemosnText = screen.getByText('Favorite Pokémons');
    expect(favoritePokemosnText).toBeInTheDocument();
  });

  test(`testa se é redirecionada para pagiana inicial "/"
    ao clicar no "link Home " na página`, () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', {
      name: 'Home',
    });
    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });

  test('testa se a apicação é direcionada para página "Not Found"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rota-nao-existe');

    const routerNotFund = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });

    expect(routerNotFund).toBeInTheDocument();
  });
});

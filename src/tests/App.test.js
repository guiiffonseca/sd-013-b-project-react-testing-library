import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

function renderWithRouter(componentToRender) {
  const customHistory = createMemoryHistory();

  return {
    ...render(
      <Router history={ customHistory }>
        {componentToRender}
      </Router>,
    ),
    history: customHistory,
  };
}

describe('Teste o componente <App.js />', () => {
  it('se contém um conjunto fixo de links de navegação.', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const linkHome = screen.getByRole('link', {
      name: /Home/i,
    });
    expect(linkHome).toBeInTheDocument();

    const linkAbout = screen.getByRole('link', {
      name: /About/i,
    });
    expect(linkAbout).toBeInTheDocument();

    const linkFavorite = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    expect(linkFavorite).toBeInTheDocument();
  });

  it('ir para URL "/" ao clicar no link Home da barra de navegação.', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const linkHome = screen.getByRole('link', {
      name: /Home/i,
    });
    userEvent.click(linkHome);

    const homePageText = screen.getByRole('button', {
      name: /All/i,
    });
    expect(homePageText).toBeInTheDocument();
  });

  it('ir para URL "/about", ao clicar no link About da barra de navegação.', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const linkAbout = screen.getByRole('link', {
      name: /About/i,
    });
    userEvent.click(linkAbout);

    const aboutPageText = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(aboutPageText).toBeInTheDocument();
  });

  it('ir para URL "/favorites", ao clicar no link Favorite Pokémons...', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const linkFavorite = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    userEvent.click(linkFavorite);

    const aboutPageText = screen.getByRole('heading', {
      level: 2,
      name: /Favorite pokémons/i,
    });
    expect(aboutPageText).toBeInTheDocument();
  });

  it('ir para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/rota-nao-existente');

    const pageNotFoundText = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(pageNotFoundText).toBeInTheDocument();
  });
});

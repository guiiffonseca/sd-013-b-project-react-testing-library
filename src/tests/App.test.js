import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa os links do arquivo App.js', () => {
  it('Testa se redireciona para a página inicial ao clicar no link Home.', () => {
    // Renderizar a pag resgatando do history
    const { history } = renderWithRouter(<App />);
    // 1. Acessar os elementos da tela
    const renderHome = screen.getByRole('link', { name: /Home/i });
    // 2. Interagir com os elementos acessados (caso necessário)
    fireEvent.click(renderHome);
    // 3. Criar o teste
    const { pathname } = history.location;
    expect(renderHome).toBeInTheDocument();
    expect(pathname).toBe('/');
  });

  it('Testa se redireciona para a página de about ao clicar no link About.', () => {
    // Renderizar a pag resgatando do history
    const { history } = renderWithRouter(<App />);
    // 1. Acessar os elementos da tela
    const renderAbout = screen.getByRole('link', { name: /about/i });
    // 2. Interagir com os elementos acessados (caso necessário)
    fireEvent.click(renderAbout);
    // 3. Criar o teste
    const { pathname } = history.location;
    expect(renderAbout).toBeInTheDocument();
    expect(pathname).toBe('/about');
  });

  it('Testa se redireciona para a página de about ao clicar no link Favorites.', () => {
    // Renderizar a pag resgatando do history
    const { history } = renderWithRouter(<App />);
    // 1. Acessar os elementos da tela
    const renderFavorites = screen.getByRole('link', { name: /Favorite Pokémons/i });
    // 2. Interagir com os elementos acessados (caso necessário)
    fireEvent.click(renderFavorites);
    // 3. Criar o teste
    const { pathname } = history.location;
    expect(renderFavorites).toBeInTheDocument();
    expect(pathname).toBe('/favorites');
  });

  it('', () => {
    // Renderizar a pag resgatando do history
    const { history } = renderWithRouter(<App />);
    history.push('/urlsemregistro');
    // 1. Acessar os elementos da tela
    const renderNotFound = screen.getByRole('heading', { name: /Not Found/i });
    // 3. Criar o teste
    expect(renderNotFound).toBeInTheDocument();
  });
});

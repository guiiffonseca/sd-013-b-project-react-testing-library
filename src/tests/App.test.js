import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../Uteis/renderWithRouter';
import App from '../App';

// Recebi ajuda do Gênesis Henriques, Matheus Figueiredo, Gabriel Ribeiro e Gustavo Alves para desenvolver esse projeto https://github.com/GenesisHenriques, https://github.com/mathfigueiredo, https://github.com/Gribeir0, https://github.com/gustavoalves23

describe('Testa os links do componente App', () => {
  it('Testa o texto do links de navegação', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[0].textContent).toBe('Home');
    expect(links[1].textContent).toBe('About');
    expect(links[2].textContent).toBe('Favorite Pokémons');
  });

  it('Testa as rotas dos link Home', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    fireEvent.click(links[0]);
    const textH2 = screen
      .getByRole('heading', { level: 2, name: /Encountered pokémons/i });
    expect(textH2).toBeDefined();
  });

  it('Testa as rotas dos link About', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    fireEvent.click(links[1]);
    const textH2 = screen
      .getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(textH2).toBeDefined();
  });

  it('Testa as rotas dos link Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    fireEvent.click(links[2]);
    const textH2 = screen
      .getByRole('heading', { level: 2, name: /Favorite pokémons/i });
    expect(textH2).toBeDefined();
  });

  it('Ao digitar uma URL desconhecida, redireciona para "Not Found"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/outraUrl');
    const titleNotFound = screen
      .getByRole('heading', { level: 2, name: /Page requested not found/i });
    expect(titleNotFound).toBeDefined();
  });
});

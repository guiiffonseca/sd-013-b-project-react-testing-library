import React from 'react';
import { screen, within, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../utilities/renderWithRouter';

describe('Testando o Componente App', () => {
  test('Teste se o topo da aplicação possui um conjunto fixo de links de navegaç', () => {
    renderWithRouter(<App />);
    // A Função Within auxilia para verificar apenas os links que estão contidos na barra de navegação.
    // Verificando se o texto do link seja igual ao que foi especificado
    const navigation = screen.getByRole('navigation');
    const navLinks = within(navigation).getAllByRole('link');
    expect(navLinks[0].textContent).toBe('Home');
    expect(navLinks[1].textContent).toBe('About');
    expect(navLinks[2].textContent).toBe('Favorite Pokémons');
  });
  test('Teste se a aplicação é redirecionada corretamente ao clicar no link Home', () => {
    // Verificando se ao clicar no link da Home retorna a URL exatamente onde está
    const { history } = renderWithRouter(<App />);
    const navigation = screen.getByRole('navigation');
    const navLinks = within(navigation).getAllByRole('link');
    fireEvent.click(navLinks[0]);
    expect(history.location.pathname).toBe('/');
  });

  test('Test se a aplicação é redirecionada corretamente ao clicar no link About', () => {
    // Verificando se ao clicar no link da About retorna a URL exatamente onde está
    const { history } = renderWithRouter(<App />);
    const navigation = screen.getByRole('navigation');
    const navLinks = within(navigation).getAllByRole('link');
    fireEvent.click(navLinks[1]);
    expect(history.location.pathname).toBe('/about');
  });

  test('A aplicação é redirecionada corretamente ao clicar no link Pokemons F', () => {
    // Verificando se ao clicar no link da Favorite Pokémons retorna a URL exatamente onde está
    const { history } = renderWithRouter(<App />);
    const navigation = screen.getByRole('navigation');
    const navLinks = within(navigation).getAllByRole('link');
    fireEvent.click(navLinks[2]);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('URL desconhecida', () => {
    // Verificando se ao entrar em um URL desconhecida, encontrar o texto not found independente se é maiúsculo ou minúsculo
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-que-nao-existe');
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});

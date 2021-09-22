import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testando o About', () => {
  test('Testa se tem informacoes sobre o About', () => {
    renderWithRouter(<About />);

    expect(screen.getByText(/This application Simulates/i)).toBeInTheDocument();
  });

  test('Verifica se tem um h2 na pagina', () => {
    renderWithRouter(<About />);

    const aboutText = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(aboutText).toBeInTheDocument();
  });

  test('Verifica se o tem dois paragrafos', () => {
    renderWithRouter(<About />);

    expect(screen.getByText(/digital /i)).toBeInTheDocument();
    expect(screen.getByText(/digital /i)).toBeInTheDocument();
  });

  test('Testa se contem a Imagem', () => {
    renderWithRouter(<About />);

    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

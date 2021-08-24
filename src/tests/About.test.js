import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testando Componente About', () => {
  test('Verifica se a página contém informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    expect(screen.getByText(/This application simulates/i)).toBeInTheDocument();
  });

  test('Verifica se contem dois h2 na aplicação', () => {
    renderWithRouter(<About />);

    const aboutText = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });

    expect(aboutText).toBeInTheDocument();
  });

  test('Verificado se o teste contém dois paragráfos', () => {
    renderWithRouter(<About />);

    expect(screen.getByText(/digital /i)).toBeInTheDocument();
    expect(screen.getByText(/details/i)).toBeInTheDocument();
  });

  test('Verifica se contém imagem', () => {
    renderWithRouter(<About />);

    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

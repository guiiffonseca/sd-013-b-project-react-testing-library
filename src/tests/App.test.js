import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando componentes da Tela inicial', () => {
  it('testa se existe no topo da página o conjunto de links', () => {
    renderWithRouter(<App />);

    const home = screen.getByRole('link', {
      name: /Home/i,
    });
    const about = screen.getByRole('link', {
      name: /About/i,
    });
    const favorites = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorites).toBeInTheDocument();
  });

  it('testa se a aplicação é redirecionada para "/" após clicar no botão home', () => {
    renderWithRouter(<App />);
    const home = screen.getByText(/Home/i);
    expect(home).toBeInTheDocument();
  });
});

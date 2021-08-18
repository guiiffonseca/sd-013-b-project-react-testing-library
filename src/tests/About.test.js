import React from 'react';
import { screen } from '@testing-library/react';

import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe(('About.js tests'), () => {
  test('Testa se a página contém um h2 com um texto definido', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const aboutPageText = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(aboutPageText).toBeInTheDocument();
  });

  test('Testa se a página tem 2 parágrafos com textos definidos', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    // Teste com o outro parágrafo está dando mais de 90 de extensão

    expect(screen.getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    ).toBeInTheDocument);
  });

  test('Testa se a página tem uma imagem específica', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const aboutImage = screen.getByRole('img', {
      name: /Pokédex/i,
    });
    expect(aboutImage.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

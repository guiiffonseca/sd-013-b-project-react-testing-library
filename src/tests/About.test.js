import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('about test', () => {
  test('testa as informações sobre a Pokédex.', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    customHistory.push('/about');
    const searchInfo1 = screen.getByText(/This application simulates a Pokédex/);
    expect(searchInfo1).toBeInTheDocument();
    const searchInfo2 = screen.getByText(/One can filter Pokémons by type/);
    expect(searchInfo2).toBeInTheDocument();
  });

  test('exibe titúlo Favorite pokémons', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    customHistory.push('/about');
    const searchTitle = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(searchTitle).toBeInTheDocument();
  });

  test('testa se a página contém a imagem de uma Pokédex', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    customHistory.push('/about');

    const image = screen.getByAltText('Pokédex');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

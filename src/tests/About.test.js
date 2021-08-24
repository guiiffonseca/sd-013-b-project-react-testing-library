import React from 'react';
import { screen, render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import App from '../App';

describe('Requisito 2 - about.js test', () => {
  test('Testando rederização do H2 pagina About', () => {
    const history = createMemoryHistory();
    history.push('/about');
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const aboutText = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(aboutText).toBeInTheDocument();
  });
  test('Testando rederização dos paragrafos pagina About', () => {
    const history = createMemoryHistory();
    history.push('/about');
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const aboutInfo = screen.getByText(/This application/i);
    expect(aboutInfo).toBeInTheDocument();

    const aboutText = screen.getByText(/One can filter/i);
    expect(aboutText).toBeInTheDocument();
  });
  test('Testando source da imagem About', () => {
    const history = createMemoryHistory();
    history.push('/about');
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const aboutImg = screen.getByRole('img');
    expect(aboutImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

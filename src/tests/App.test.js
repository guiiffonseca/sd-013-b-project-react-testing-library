import React from 'react';
import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import App from '../App';

describe('Requisito 1 - App.js test', () => {
  test('testando a renderização dos links da nav', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const home = screen.getByRole('link', {
      name: /home/i,
    });

    expect(home).toBeInTheDocument();
  });
});

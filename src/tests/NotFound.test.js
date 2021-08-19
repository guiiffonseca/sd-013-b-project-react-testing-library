import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Requisito 4', () => {
  test('Teste se a página contém um heading H2 e uma IMG', () => {
    render(
      <MemoryRouter initialEntries={ ['/notfound'] }>
        <App />
      </MemoryRouter>,
    );

    const notFound = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(notFound).toBeInTheDocument();
  });

  test('Teste se a página mostra a imagem certa', () => {
    render(
      <MemoryRouter initialEntries={ ['/notfound'] }>
        <App />
      </MemoryRouter>,
    );

    const imgCheck = screen.getByAltText(/Pikachu crying/i);

    expect(imgCheck).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});

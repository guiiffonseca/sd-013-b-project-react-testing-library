import React from 'react';
import { screen } from '@testing-library/react';
import RenderWithRouter from './utils/RenderWithRouter';
import App from '../App';

describe('Testa pagina Not Found', () => {
  test('Testa se existe texto Not Fund na pagina', () => {
    const { history } = RenderWithRouter(<App />);
    history.push('/testeTeste');

    const noFoundText = screen.getByText('Page requested not found');

    expect(noFoundText).toBeInTheDocument();
  });

  test('Testa se existe um gif', () => {
    const { history } = RenderWithRouter(<App />);
    history.push('/testeTeste');

    const noFoundGif = screen.getAllByRole('img');

    expect(noFoundGif[1]).toBeInTheDocument();
    expect(noFoundGif[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});

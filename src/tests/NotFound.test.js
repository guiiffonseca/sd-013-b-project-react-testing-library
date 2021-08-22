import React from 'react';
// import { Router } from 'react-router';
// import { BrowserRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
// import { createMemoryHistory } from 'history';
// import { MemoryRouter } from 'react-router';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  test('Se página contém um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);

    const notFoundText = screen.getByText('Page requested not found');
    expect(notFoundText).toBeInTheDocument();
    const emoji = screen.getByLabelText('Crying emoji');
    expect(emoji).toBeInTheDocument();
  });

  test('Se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);

    const NotFoundImg = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(NotFoundImg).toBeInTheDocument();
    expect(NotFoundImg).toHaveAttribute(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});

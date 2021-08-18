import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe(' Teste o componente <NotFound.js />', () => {
  test(
    'Teste se página contém um heading h2 com o texto Page requested not found',
    () => {
      render(<NotFound />);
      const notFoundText = screen.getByRole('heading',
        { name: /Page requested not found/i,
          level: 2,
        });
      expect(notFoundText).toBeInTheDocument();
    },
  );

  test(
    'Teste se página mostra a imagem',
    () => {
      render(<NotFound />);
      const imageNotFound = screen.getByAltText(/Pikachu crying because the/i);
      expect(imageNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    },
  );
});

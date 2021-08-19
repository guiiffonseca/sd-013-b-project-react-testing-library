import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  it('se página contém um heading h2 com o texto Page requested not found 😭', () => {
    render(<NotFound />);
    const component = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(component).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    render(<NotFound />);
    const imgUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const altText = 'Pikachu crying because the page requested was not found';
    const image = screen.getByAltText(altText);
    expect(image).toHaveAttribute('src', imgUrl);
  });
});

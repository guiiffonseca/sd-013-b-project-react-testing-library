import React from 'react';
import { render, screen } from '@testing-library/react';

import { About } from '../components';

describe('About text tests', () => {
  beforeEach(() => render(<About />));

  test('If the page talks about Pokedex', () => {
    const text = screen.getByRole('heading', { level: 2 });
    expect(text).toHaveTextContent(/about pokédex/i);
  });

  test('If has 2 Paragraphs and they talk about pokédex', () => {
    const P_QUANTITY = 2;

    const text = screen.getAllByText(/pokémon/i);
    expect(text).toHaveLength(P_QUANTITY);
  });

  test('If has an image', () => {
    const img = screen.getByRole('img');
    const imgSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(img).toBeInTheDocument();
    expect(img.src).toBe(imgSrc);
  });
});

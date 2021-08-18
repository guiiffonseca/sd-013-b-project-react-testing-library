import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Teste o componente <About.js />.', () => {
  test('Teste se a página contém as informações sobre a Pokédex.',
    async () => {
      render(<About />);
      const headingAbout = screen.getByRole('heading', {
        level: 2,
        name: /About Pokédex/i,
      });
      const paragraph1 = screen.getByText(/This application simulates a/i);
      const paragraph2 = screen.getByText(/One can filter Pokémons/i);
      expect([paragraph1, paragraph2].length).toBe(2);
      expect(headingAbout).toBeInTheDocument('');
    });
  test('Teste se a pagina contem uma iamge de um apokedex', () => {
    render(<About />);
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

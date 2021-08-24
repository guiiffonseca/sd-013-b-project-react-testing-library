import { render, screen } from '@testing-library/react';
import React from 'react';
import { About } from '../components';

describe('teste do componente About e as informações sobre a Pokédex', () => {
  test('Teste se contém um h2 na tela com o texto About Pokédex ', () => {
    render(<About />);
    const aboutText = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(aboutText).toBeInTheDocument();
  });
  test('teste se a dois paragrafos na tela e se os textos renderizam', () => {
    render(<About />);
    const paragrafoUm = screen.getByText(
      /This application simulates a Pokédex, a digital encyclopedia/i,
    );
    expect(paragrafoUm).toBeInTheDocument();
    const paragrafoDois = screen.getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );
    expect(paragrafoDois).toBeInTheDocument();
  });
  test('teste se renderiza a img', () => {
    render(<About />);
    const imgPoke = screen.getByRole('img');
    expect(imgPoke.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

describe('Teste o componente About', () => {
  beforeEach(() => { // exemplo do before visto na documentacao https://jestjs.io/pt-BR/docs/setup-teardown
    render(<About />);
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(heading).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const paragraph = screen.getAllByText(/Pokédex/i);
    expect(paragraph).toHaveLength(2);
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const image = screen.getByRole('img', { name: 'Pokédex' });
    expect(image.src).toStrictEqual('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouter } from '../components/utils/renderWithRouter';
import { About } from '../components';

describe('testes do componente <About.js/>', () => {
  test('testa se a page contem um heading h2 com determinado texto', () => {
    const { history } = renderWithRouter(<About />);
    history.push('/about');
    const about = screen.getByRole('heading', {
      name: /About Pokédex/,
      level: 2,
    });
    expect(about).toBeInTheDocument();
  });
  test('testa se os p`s do component about existem e se tem os textos esperados', () => {
    const { history } = renderWithRouter(<About />);
    history.push('/about');
    const paragrafo1 = screen.getByText(/This application simulates a/i);
    const paragrafo2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(paragrafo1 && paragrafo2).toBeInTheDocument();
  });
  test('testa se a page contem determinada imagem', () => {
    const { history } = renderWithRouter(<About />);
    history.push('/about');
    const imagem = screen.getByRole('img');
    expect(imagem).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});

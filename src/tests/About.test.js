import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Test about heading', () => {
  test('Testa heading da pagina', () => {
    const { history } = renderWithRouter(<About />);
    history.push('/about');
    const renderH2 = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(renderH2).toBeInTheDocument();
  });

  test('Testing paragraphs', () => {
    const { history } = renderWithRouter(<About />);
    history.push('/about');
    const renderParagraph1 = screen.getByText(/This application simulates a Pokédex/i);
    const renderParagraph2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(renderParagraph1).toBeInTheDocument();
    expect(renderParagraph2).toBeInTheDocument();
  });

  test('Testing image', () => {
    const { history } = renderWithRouter(<About />);
    history.push('/about');
    const renderImg = screen.getByRole('img');
    expect(renderImg.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

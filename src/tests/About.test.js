import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testando o componente About', () => {
  it('Testa se a página contém informações sobre pokedex', () => {
    render(<About />);
    expect(screen.getByText('About Pokédex')).toBeInTheDocument();
  });
  it('Testa se a página contém a imagem de uma Pokédex', () => {
    render(<About />);
    const img = screen.getByAltText('Pokédex');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
// mudando

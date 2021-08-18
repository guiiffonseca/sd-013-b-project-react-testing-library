import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Teste do componente App', () => {
  it('Existe um conjunto de links no topo da navegação', () => {
    render(<App />);

    const linkToHome = screen.getByText('Home');
    const linkToAbout = screen.getByText('About');
    const linkToFavorites = screen.getByText('Favorite Pokémons');

    expect(linkToHome).toBeInTheDocument();
    expect(linkToAbout).toBeInTheDocument();
    expect(linkToFavorites).toBeInTheDocument();
  });
});

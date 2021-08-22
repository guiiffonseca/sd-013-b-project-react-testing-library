import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

describe('testando o componente FavoritePokemons', () => {
  test(`se é exibido na tela a mensagem No favorite pokemon found,
    se a pessoa não tiver pokémons favoritos`, () => {
    render(<FavoritePokemons />);
    const message = screen.getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();
  });
});

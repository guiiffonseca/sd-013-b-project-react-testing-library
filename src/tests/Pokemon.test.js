import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderRouter from '../components/renderRouter';

describe('Teste do componente notFound', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const { history } = renderRouter(<App />);
    const pikachuName = screen.getByTestId('pokemon-name');
    expect(pikachuName).toBeInTheDocument();
    expect(pikachuName).toHaveTextContent('Pikachu');

    const pikachuType = screen.getByTestId('pokemon-type');
    expect(pikachuType).toBeInTheDocument();
    expect(pikachuType).toHaveTextContent('Electric');

    const pikachuPeso = screen.getByText('Average weight: 6.0 kg');
    expect(pikachuPeso).toBeInTheDocument();

    const pikachuImage = screen.getByAltText('Pikachu sprite');
    expect(pikachuImage).toBeInTheDocument();
    expect(pikachuImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

    const maisDetalhes = screen.getByRole('link', {
      name: 'More details',
    });
    expect(maisDetalhes).toBeInTheDocument();
    userEvent.click(maisDetalhes);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  test('Verifica favorito', () => {
    renderRouter(<App />);
    const maisDetalhes = screen.getByText('More details');
    userEvent.click(maisDetalhes);

    const checkboxInput = screen.getByRole('checkbox');
    userEvent.click(checkboxInput);

    const homeText = screen.getByText('Home');
    userEvent.click(homeText);

    const favoriteStart = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteStart).toBeInTheDocument();
    expect(favoriteStart).toHaveAttribute('src', '/star-icon.svg');
  });
});

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';
// criar um novo arquivo gera erro de lint pela quantia de caracteres...
import pokemons from '../data';

describe('Testing Pokemon Component', () => {
  // beforeEach(() => {
  // });
  test('cards information of pokemon', () => {
    renderWithRouter(<App />);
    // Teste se é renderizado um card com as informações de determinado pokémon.
    pokemons.forEach(
      ({ name, type, image, averageWeight: { value, measurementUnit } }) => {
        // O nome correto do Pokémon deve ser mostrado na tela.
        expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
        // O tipo correto do pokémon deve ser mostrado na tela.
        expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
        // O peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, respectivamente, o peso médio do pokémon e sua unidade de medida.
        expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(/Average weight/i);
        expect(screen
          .getByTestId(/pokemon-weight/i)).toHaveTextContent(value);
        expect(screen
          .getByTestId(/pokemon-weight/i))
          .toHaveTextContent(measurementUnit);
        // A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon;
        expect(screen.getByRole('img')).toHaveAttribute('src', image);
        expect(screen.getByRole('img')).toHaveAttribute('alt', `${name} sprite`);
        userEvent.click(screen.getByText(/Próximo pokémon/i));
      },
    );
  });
  test('card link', () => {
    // Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido;
    const { history } = renderWithRouter(<App />);
    // Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.
    const details = screen.getByText(/more details/i);

    expect(details).toBeInTheDocument();
    userEvent.click(details);
    expect(history.location.pathname).toBe('/pokemons/25');
    // Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver;
    expect(screen.getByText(/pikachu details/i)).toBeInTheDocument();
  });
  test('favorite test', () => {
    // Teste se existe um ícone de estrela nos Pokémons favoritados.
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(/more details/i));
    userEvent.click(screen.getByRole('checkbox'));
    // O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg
    const roleStar = screen.getAllByRole('img')[1];
    expect(roleStar).toHaveAttribute('src', '/star-icon.svg');
    // A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite, onde <pokemon> é o nome do Pokémon exibido.
    expect(roleStar).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});

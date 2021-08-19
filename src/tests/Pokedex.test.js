import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Requisito 5', () => {
  test('Teste se a página contém um heading h2 com um texto', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const head2 = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(head2).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da Lista ao clicar', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const getNextPokemon = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });

    expect(getNextPokemon).toBeInTheDocument();
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const alltypes = screen.getAllByTestId('pokemon-type-button');

    expect(alltypes[0]).toHaveTextContent('Electric');
    expect(alltypes[1]).toHaveTextContent('Fire');
    expect(alltypes[2]).toHaveTextContent('Bug');
    expect(alltypes[3]).toHaveTextContent('Poison');
    expect(alltypes[4]).toHaveTextContent('Psychic');
    expect(alltypes[5]).toHaveTextContent('Normal');
    expect(alltypes[6]).toHaveTextContent('Dragon');

    for (let i = 0; i < alltypes.length; i += 1) {
      userEvent.click(alltypes[i]);
      const typeId = screen.getByTestId('pokemon-type');
      expect(typeId.textContent).toBe(alltypes[i].textContent);
    }
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const getButtonAll = screen.getByRole('button', {
      name: /All/i,
    });
    userEvent.click(getButtonAll);
    expect(getButtonAll).toBeInTheDocument();
  });
});

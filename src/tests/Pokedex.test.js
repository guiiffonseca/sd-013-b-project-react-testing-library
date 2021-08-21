import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('test', () => {
  test('página contém um heading h2', () => {
    renderWithRouter(<App />);
    expect(screen.queryByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    })).toBeInTheDocument();
  });

  test('O botão deve conter o texto Próximo pokémon', () => {
    renderWithRouter(<App />);
    const botaoProximo = screen.queryByTestId('next-pokemon');
    expect(botaoProximo).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const apenas = screen.queryAllByTestId('pokemon-name');
    expect(apenas.length).toBe(1);
  });

  test('existir um botão de filtragem para cada tipo de Pokémon, sem repetição', () => {
    const tipo = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psycnic',
      'Normal',
      'Dragon',
    ];
    renderWithRouter(<App />);
    const botao = screen.getAllByTestId('pokemon-type-button');
    expect(botao.length).toBe(tipo.length);
  });

  test('Ao clicar no botão, aparecar outro pokemon', () => {
    renderWithRouter(<App />);
    const primerioPokemon = screen.queryByText(/pikachu/i);
    expect(primerioPokemon).toBeInTheDocument();
    const botaoProximo = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    fireEvent.click(botaoProximo);
    const segundoPokemon = screen.queryByText(/charmander/i);
    expect(segundoPokemon).toBeInTheDocument();
  });

  test('O primeiro Pokémon deve ser mostrado, se estiver no último Pokémon', () => {
    const listPokemon = [
      'Pikachu',
      'Charmander',
      'Caterpie',
      'Ekans',
      'Alakazam',
      'Mew',
      'Rapidash',
      'Snorlax',
      'Dragonair',
    ];
    renderWithRouter(<App />);
    const lista0 = screen.queryByText(listPokemon[0]);
    expect(lista0).toBeInTheDocument();
    const botao = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    fireEvent.click(botao);
    expect(screen.queryByText(listPokemon[1])).toBeInTheDocument();
    fireEvent.click(botao);
    expect(screen.queryByText(listPokemon[2])).toBeInTheDocument();
    fireEvent.click(botao);
    expect(screen.queryByText(listPokemon[3])).toBeInTheDocument();
    fireEvent.click(botao);
    expect(screen.queryByText(listPokemon[4])).toBeInTheDocument();
    fireEvent.click(botao);
    expect(screen.queryByText(listPokemon[5])).toBeInTheDocument();
    fireEvent.click(botao);
    expect(screen.queryByText(listPokemon[6])).toBeInTheDocument();
    fireEvent.click(botao);
    expect(screen.queryByText(listPokemon[7])).toBeInTheDocument();
    fireEvent.click(botao);
    expect(screen.queryByText(listPokemon[8])).toBeInTheDocument();
    fireEvent.click(botao);
    expect(screen.queryByText(listPokemon[0])).toBeInTheDocument();
  });
});

describe('teste 2', () => {
  test('O texto do botão deve corresponder ao nome do tipo', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('button', {
      name: /electric/i,
    })).toBeInTheDocument();
    expect(screen.getByRole('button', {
      name: /fire/i,
    })).toBeInTheDocument();
    expect(screen.getByRole('button', {
      name: /bug/i,
    })).toBeInTheDocument();
    expect(screen.getByRole('button', {
      name: /poison/i,
    })).toBeInTheDocument();
    expect(screen.getByRole('button', {
      name: /normal/i,
    })).toBeInTheDocument();
    expect(screen.getByRole('button', {
      name: /dragon/i,
    })).toBeInTheDocument();
    expect(screen.getByRole('button', {
      name: /psychic/i,
    })).toBeInTheDocument();
  });

  test('O botão All precisa estar sempre visível e o texto All', () => {
    renderWithRouter(<App />);
    const botaoFogo = screen.getByRole('button', {
      name: /fire/i,
    });
    fireEvent.click(botaoFogo);
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    const botaoAll = screen.getByRole('button', {
      name: /all/i,
    });
    fireEvent.click(botaoAll);
    expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
  });

  test('A partir da seleção de um botão, a Pokédex deve visualizar aquele tipo', () => {
    const tipo = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    renderWithRouter(<App />);
    const botaoEletrico = screen.getByRole('button', {
      name: /electric/i,
    });
    fireEvent.click(botaoEletrico);
    expect(screen.getAllByText(tipo[0]).length).toBe(2);
    const botaoFire = screen.getByRole('button', {
      name: /fire/i,
    });
    fireEvent.click(botaoFire);
    expect(screen.getAllByText(tipo[1]).length).toBe(2);
    const botaoBug = screen.getByRole('button', {
      name: /bug/i,
    });
    fireEvent.click(botaoBug);
    expect(screen.getAllByText(tipo[2]).length).toBe(2);
    const botaoPosion = screen.getByRole('button', {
      name: /poison/i,
    });
    fireEvent.click(botaoPosion);
    expect(screen.getAllByText(tipo[3]).length).toBe(2);
    const botaoPsycnic = screen.getByRole('button', {
      name: /psychic/i,
    });
    fireEvent.click(botaoPsycnic);
    expect(screen.getAllByText(tipo[4]).length).toBe(2);
    const botaoNormal = screen.getByRole('button', {
      name: /normal/i,
    });
    fireEvent.click(botaoNormal);
    expect(screen.getAllByText(tipo[5]).length).toBe(2);
    const botaoDragon = screen.getByRole('button', {
      name: /dragon/i,
    });
    fireEvent.click(botaoDragon);
    expect(screen.getAllByText(tipo[6]).length).toBe(2);
  });
});

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Se o topo possui link com texto Home, About e Favorite Pokémons.', () => {
  it('Texto do primeiro link é Home', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', {
      name: 'Home',
    });
    expect(link).toBeInTheDocument();
  });

  it('Link leva a página do Home', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', {
      name: 'Home',
    });
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toEqual('/');
  });

  it('Texto do primeiro link é About', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', {
      name: 'About',
    });
    expect(link).toBeInTheDocument();
  });

  it('Link leva a página do About', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', {
      name: 'About',
    });
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toEqual('/about');
  });

  it('Texto do primeiro link é Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(link).toBeInTheDocument();
  });

  it('Link leva a página do Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toEqual('/favorites');
  });

  it('Url desconhecida leva a página do Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/test');
    const text = screen.getByText('Page requested not found');
    expect(text).toBeInTheDocument();
  });
});

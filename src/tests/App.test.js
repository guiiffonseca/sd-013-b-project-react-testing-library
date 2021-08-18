import React from 'react';
import { getByRole, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testing all links', () => {
  it('sould test the home link', () => {
    const { history } = renderWithRouter(<App />);
    let path = history.location.pathname;
    expect(path).toBe('/');
    const link = screen.getByRole('link', {
      name: 'Home',
    });
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    path = history.location.pathname;
    expect(path).toBe('/');
  });

  it('sould test the about link', () => {
    const { history } = renderWithRouter(<App />);
    let path = history.location.pathname;
    expect(path).toBe('/');
    const link = screen.getByRole('link', {
      name: 'About',
    });
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    path = history.location.pathname;
    expect(path).toBe('/about');
  });

  it('sould test the favorites link', () => {
    const { history } = renderWithRouter(<App />);
    let path = history.location.pathname;
    expect(path).toBe('/');
    const link = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    path = history.location.pathname;
    expect(path).toBe('/favorites');
  });
});

describe('test notFound', () => {
  it('should be page notfound', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/any-pag-enot-found');
    const path = history.location.pathname;
    expect(path).toBe('/any-pag-enot-found');
    const image = screen.getByRole('img', {
      name: 'Crying emoji',
    });
    expect(image).toBeInTheDocument();
  });
});

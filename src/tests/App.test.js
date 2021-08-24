import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('About the component App.js', () => {
  it('verifies if there are 3 links', () => {
    renderWithRouter(<App />);

    const listaDeNav = screen.getAllByTestId('link');
    const expectedLength = 3;

    expect(listaDeNav.length).toBe(expectedLength);
  });

  it('verifies text written in the 3 links', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByText(/home/i);
    const aboutLink = screen.getByText(/About/i);
    const favLink = screen.getByText(/Favorite Pokémons/i);

    expect(homeLink.textContent).toBe('Home');
    expect(aboutLink.textContent).toBe('About');
    expect(favLink.textContent).toBe('Favorite Pokémons');
  });

  it('verifies if link "home" redirect to "/"', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByText(/Home/i);

    fireEvent.click(homeLink);

    expect(history.location.pathname).toBe('/');
  });

  it('verifies if link "About" redirect to "/about"', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByText(/About/i);

    fireEvent.click(aboutLink);

    expect(history.location.pathname).toBe('/about');
  });

  it('verifies if link "Favorite Pokémons" redirect to "/favorites"', () => {
    const { history } = renderWithRouter(<App />);

    const favLink = screen.getByText(/Favorite Pokémons/i);

    fireEvent.click(favLink);

    expect(history.location.pathname).toBe('/favorites');
  });

  it('verifies if a unknown link redirect to "Page Not Found"', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/brigadu');

    const message = screen.getByText(/Page requested not found/i);

    expect(message).toBeInTheDocument();
  });
});

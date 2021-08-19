import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

/* Função desenvolvida conforme explicação do Icaro na aula ao vivo, visando contornar a "falha"
do BrowserRouter no que diz respeito ao teste de rotas com RTL */

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

export default renderWithRouter;

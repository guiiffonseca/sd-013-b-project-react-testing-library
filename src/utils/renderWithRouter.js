//  componente e funções feitas segundo exemplo na aula ao vivo do Icaro dia 15.3
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

export default function renderWithRouter(componentToRender) {
  const custonHistory = createMemoryHistory();

  return {
    ...render(
      <Router history={ custonHistory }>
        {componentToRender}
      </Router>,
    ),
    history: custonHistory,
  };
}

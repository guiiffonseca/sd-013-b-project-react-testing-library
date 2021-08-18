import React from 'react';
import { Router } from 'react-router';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';

export default function rederWithRouter(componentToRender) {
  const history = createMemoryHistory();

  return {
    ...render(
      <Router history={ history }>
        {componentToRender}
      </Router>,
    ),
    history,
  };
}

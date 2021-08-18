import React from 'react';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Router } from 'react-router';

export default function renderWithRouter(componentToRender) {
  const customyHistory = createMemoryHistory();

  return {
    ...render(
      <Router history={ customyHistory }>
        { componentToRender }
      </Router>,
    ),
    history: customyHistory,
  };
}

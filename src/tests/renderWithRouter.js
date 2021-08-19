import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

export default function renderWithRouter(component) {
  const customHistory = createMemoryHistory();
  return {
    ...render(
      <Router history={ customHistory }>
        { component }
      </Router>,
    ),
    history: customHistory,

  };
}

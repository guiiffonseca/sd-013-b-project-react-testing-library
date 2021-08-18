import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

export default function renderWithRouter(component) {
  const customHistory = createMemoryHistory();
  const renderReturn = render(
    <Router history={ customHistory }>
      {component}
    </Router>,
  );

  return {
    ...renderReturn,
    history: customHistory,
  };
}

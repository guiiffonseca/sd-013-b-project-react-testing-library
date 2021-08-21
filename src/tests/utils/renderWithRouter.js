import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component) => {
  const CustomHistory = createMemoryHistory();

  return {
    ...render(
      <Router history={ CustomHistory }>
        {component}
      </Router>,
    ),
    history: CustomHistory,
  };
};

export default renderWithRouter;

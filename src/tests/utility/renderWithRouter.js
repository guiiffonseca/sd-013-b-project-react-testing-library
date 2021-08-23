import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

function renderWithRouter(componentToRender) {
  const customHistory = createMemoryHistory();

  const returnOfRender = render(
    <Router history={ customHistory }>
      {componentToRender}
    </Router>,
  );

  return { ...returnOfRender, history: customHistory };
}

export default renderWithRouter;

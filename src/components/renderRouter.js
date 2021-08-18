import { render } from '@testing-library/react';
import {Router} from 'react-router-dom';
import { createMemoryHistory } from 'history';

export default function renderRouter(renderComponent){
  const history = createMemoryHistory();

  return {
    ...render(
      <Router history={ history }>
        {renderComponent}
      </Router>
    ),history,
  }
}
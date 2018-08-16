import { renderToString } from 'react-dom/server';
import React from 'react';
import { StaticRouter } from 'react-router';
import App from '../../client/src/app/app';

export default url =>
  renderToString(
    <StaticRouter context={{}} location={url}>
      <App />
    </StaticRouter>
  );

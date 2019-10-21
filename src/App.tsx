import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import configureStore, { history } from 'store';

import SkinPage from 'pages/SkinPage';
import SkinsPage from 'pages/SkinsPage';
import NotFoundPage from 'pages/NotFoundPage';

const store = configureStore();

const App: React.FC = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/(skins)?" exact component={SkinsPage} />
        <Route path="/skins/:id(\d+)" exact component={SkinPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default App;

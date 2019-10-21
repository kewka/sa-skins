import { createHashHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import rootReducer, { AppState } from './rootReducer';

export const history = createHashHistory();

export type AppStore = ReturnType<typeof configureStore>;

export default function configureStore(initialState?: AppState) {
  return createStore(
    rootReducer(history),
    initialState,
    composeWithDevTools(applyMiddleware(routerMiddleware(history)))
  );
}

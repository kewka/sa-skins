import { combineReducers } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import skins from './skins/reducer';
import { SkinsState } from './skins/types';

export type AppState = {
  router: RouterState;
  skins: SkinsState;
};

export default function rootReducer(history: History) {
  return combineReducers<AppState>({
    router: connectRouter(history),
    skins
  });
}

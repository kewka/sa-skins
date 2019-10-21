import { createSelector } from 'reselect';
import { AppState } from 'store/rootReducer';
import SkinDTO from 'types/SkinDTO';
import { SkinsState } from './types';

/**
 * Selects an array of skins.
 */
export const getSkins = createSelector<AppState, SkinsState, SkinDTO[]>(
  state => state.skins,
  skins => Object.values(skins) as SkinDTO[]
);

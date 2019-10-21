import skins from 'data/skins.json';
import { SkinsState } from './types';

export const initialState: SkinsState = skins.reduce(
  (data, skin) => ({
    ...data,
    [skin.id]: skin
  }),
  {}
);

export default function reducer(state = initialState) {
  return state;
}

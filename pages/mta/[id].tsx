import skins from 'data/mta.json';
import {
  createGetStaticPaths,
  createGetStaticProps,
  createSkinPage,
} from 'utils/skin-page';

export const getStaticPaths = createGetStaticPaths(skins);
export const getStaticProps = createGetStaticProps(skins);

export default createSkinPage({
  getSkinUrl: (skin) => `/mta/${skin.id}`,
});

import skins from 'data/samp.json';
import {
  createGetStaticPaths,
  createGetStaticProps,
  createSkinPage,
} from 'utils/skin-page';

export const getStaticPaths = createGetStaticPaths(skins);
export const getStaticProps = createGetStaticProps(skins);

export default createSkinPage({
  getSkinUrl: (skin) => `/samp/${skin.id}`,
});

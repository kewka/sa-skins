import { List } from '@mui/material';
import NextLink from 'next/link';
import SkinListItem from 'components/SkinListItem';
import skins from 'data/samp.json';

export default function SampPage() {
  return (
    <List>
      {skins.map((skin) => (
        <NextLink href={`/samp/${skin.id}`} passHref key={skin.id}>
          <SkinListItem component="a" skin={skin} />
        </NextLink>
      ))}
    </List>
  );
}

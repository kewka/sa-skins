import { List } from '@mui/material';
import NextLink from 'next/link';
import SkinListItem from 'components/SkinListItem';
import skins from 'data/mta.json';

export default function MtaPage() {
  return (
    <List>
      {skins.map((skin) => (
        <NextLink href={`/mta/${skin.id}`} passHref key={skin.id}>
          <SkinListItem component="a" skin={skin} />
        </NextLink>
      ))}
    </List>
  );
}

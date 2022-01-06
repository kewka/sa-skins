import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  ListItemButtonProps,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import SkinData from 'data/SkinData';
import { forwardRef } from 'react';

export type SkinListItemProps = ListItemButtonProps & {
  skin: SkinData;
} & Record<string, any>;

export default forwardRef(function SkinListItem(
  { skin, ...rest }: SkinListItemProps,
  ref: any
) {
  return (
    <ListItemButton ref={ref} {...rest}>
      <ListItemAvatar>
        <Avatar
          variant="square"
          sx={{
            '& > img': {
              objectFit: 'cover',
              objectPosition: 'top',
            },
          }}
          src={skin.image}
        />
      </ListItemAvatar>
      <ListItemText
        primary={`ID: ${skin.id}`}
        secondary={`Model: ${skin.model}`}
      />
      <ListItemSecondaryAction>
        <ChevronRightIcon />
      </ListItemSecondaryAction>
    </ListItemButton>
  );
});

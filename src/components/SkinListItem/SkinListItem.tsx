import React from 'react';
import clsx from 'clsx';
import { List, Avatar, Button } from 'antd';
import { Link } from 'react-router-dom';

import SkinDTO from 'types/SkinDTO';

import './skin-list-item.scss';

type Props = {
  skin: SkinDTO;
} & React.ComponentProps<typeof List.Item>;

const SkinListItem: React.FC<Props> = ({ skin, className, ...restProps }) => (
  <List.Item
    actions={[
      <Link to={`/skins/${skin.id}`}>
        <Button type="primary" ghost>
          Open
        </Button>
      </Link>
    ]}
    className={clsx('skin-list-item', className)}
    {...restProps}
  >
    <List.Item.Meta
      avatar={
        <Avatar
          shape="square"
          size="large"
          className="skin-list-item__avatar"
          src={skin.image}
        />
      }
      title={`ID: ${skin.id}`}
      description={`Model: ${skin.model}`}
    />
  </List.Item>
);

export default React.memo(SkinListItem);

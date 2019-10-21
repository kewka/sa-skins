import React from 'react';
import { PageHeader, Button } from 'antd';
import clsx from 'clsx';

import './header.scss';

type Props = React.ComponentProps<typeof PageHeader>;

const Header: React.FC<Props> = ({ className, ...restProps }) => (
  <PageHeader
    className={clsx('header', className)}
    extra={
      <div className="header__extra">
        <Button
          href="https://github.com/Kewka/sa-skins"
          type="dashed"
          icon="github"
        >
          GitHub
        </Button>
      </div>
    }
    {...restProps}
  />
);

export default Header;

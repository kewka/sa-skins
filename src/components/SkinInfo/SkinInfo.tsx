import React from 'react';
import clsx from 'clsx';
import SkinDTO from 'types/SkinDTO';

type Props = { skin: SkinDTO } & React.ComponentProps<'div'>;

const SkinInfo: React.FC<Props> = ({ skin, className, ...restProps }) => (
  <div className={clsx('skin-info', className)} {...restProps}>
    <img className="skin-info__image" src={skin.image} alt={skin.model} />
  </div>
);

export default SkinInfo;

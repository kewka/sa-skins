import React from 'react';
import { useSelector } from 'react-redux';
import { List, Layout } from 'antd';

import Header from 'components/Header';
import SkinListItem from 'components/SkinListItem';

import { getSkins } from 'store/skins/selectors';

import './skins-page.scss';

const SkinsPage: React.FC = () => {
  const skins = useSelector(getSkins);

  return (
    <Layout className="skins-page">
      <Header className="skins-page__header" title="Skins" />
      <Layout.Content className="skins-page__content">
        <List
          dataSource={skins}
          renderItem={skin => <SkinListItem key={skin.id} skin={skin} />}
        />
      </Layout.Content>
    </Layout>
  );
};

export default SkinsPage;

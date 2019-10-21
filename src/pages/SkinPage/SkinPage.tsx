import React, { useCallback } from 'react';
import { Layout } from 'antd';
import { RouteComponentProps } from 'react-router';
import { useSelector } from 'react-redux';
import SkinDTO from 'types/SkinDTO';
import Header from 'components/Header';
import SkinViewport from 'components/SkinViewport';
import SkinInfo from 'components/SkinInfo';
import { AppState } from 'store/rootReducer';
import NotFoundPage from 'pages/NotFoundPage';

import './skin-page.scss';

type Props = RouteComponentProps<{ id: string }>;

const SkinPage: React.FC<Props> = ({ history, match, location }) => {
  const skin = useSelector<AppState, SkinDTO | undefined>(
    state => state.skins[match.params.id]
  );
  const handleBack = useCallback(() => history.replace('/'), [history]);

  return skin ? (
    <Layout className="skin-page">
      <Header
        onBack={handleBack}
        title={`Skin ID: ${skin.id}`}
        subTitle={skin.model}
        className="skin-page__header"
      />
      <Layout.Content className="skin-page__content">
        <SkinViewport className="skin-page__viewport" skin={skin} />
        <SkinInfo className="skin-page__info" skin={skin} />
      </Layout.Content>
    </Layout>
  ) : (
    <NotFoundPage />
  );
};

export default SkinPage;

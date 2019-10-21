import React, { useCallback } from 'react';
import { Layout, Typography, Icon } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router';

import Header from 'components/Header';

import './not-found-page.scss';

type Props = RouteComponentProps;

const NotFoundPage: React.FC<Props> = ({ history }) => {
  const handleBack = useCallback(() => history.replace('/'), [history]);
  return (
    <Layout className="not-found-page">
      <Header
        backIcon={<Icon type="home" />}
        onBack={handleBack}
        title="Error"
        className="not-found-page__header"
      />
      <Layout.Content className="not-found-page__content">
        <Typography.Title className="not-found-page__title" type="danger">
          404
        </Typography.Title>
        <Typography.Text className="not-found-page__message" type="danger">
          Page not found
        </Typography.Text>
      </Layout.Content>
    </Layout>
  );
};

export default withRouter(NotFoundPage);

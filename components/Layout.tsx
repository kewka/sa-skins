import { Box, Container, Stack } from '@mui/material';
import { ReactNode } from 'react';
import Header from './Header';

export type LayoutProps = {
  children?: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <Stack sx={{ minHeight: '100vh' }}>
      <Header />
      <Container
        component="main"
        sx={{ py: 1, flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        {children}
      </Container>
    </Stack>
  );
}

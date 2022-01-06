import { Button } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

export type HeaderLinkProps = {
  href: string;
  children?: ReactNode;
};

export default function HeaderLink({ href, children }: HeaderLinkProps) {
  const router = useRouter();
  return (
    <NextLink href={href} passHref>
      <Button
        component="a"
        color={router.pathname === href ? 'primary' : 'inherit'}
      >
        {children}
      </Button>
    </NextLink>
  );
}

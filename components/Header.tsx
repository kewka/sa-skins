import {
  AppBar,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

import HeaderLink from './HeaderLink';

export default function Header() {
  return (
    <AppBar position="sticky">
      <Container>
        <Toolbar disableGutters>
          <Typography sx={{ flexGrow: 1 }} variant="h6">
            SA Skins
          </Typography>
          <Stack component="nav" direction="row" spacing={1}>
            <HeaderLink href="/">SA-MP</HeaderLink>
            <HeaderLink href="/mta">MTA</HeaderLink>
            <IconButton
              color="inherit"
              href="https://github.com/kewka/sa-skins"
            >
              <GitHubIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

import React from 'react';
import { Page } from '../App';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';

import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';

interface HeaderProps {
  navigateTo: (page: Page) => void;
  currentPage: Page;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ navigateTo, currentPage, onLogout }) => {
  const theme = useTheme();
  const navItems: { label: string; page: Page }[] = [
    { label: 'Forms', page: 'forms' },
    { label: 'Elements', page: 'elements' },
    { label: 'Tables', page: 'tables' },
    { label: 'Dynamic', page: 'dynamic' },
    { label: 'Charts', page: 'charts' },
  ];

  return (
    <AppBar position="sticky" elevation={0} sx={{ backgroundColor: theme.palette.background.paper, borderBottom: `1px solid ${theme.palette.divider}` }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {onLogout && (
            <IconButton onClick={onLogout} sx={{ mr: 2, color: theme.palette.text.primary }}>
              <LogoutIcon />
            </IconButton>
          )}
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              mr: 4,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: theme.palette.text.primary,
              cursor: 'pointer'
            }}
            onClick={() => navigateTo('landing' as any)} // Navigate to landing
          >
            QA Playground
          </Typography>

          <Box sx={{ flexGrow: 1, display: 'flex', overflowX: 'auto' }}>
            {navItems.map((item) => (
              <Button
                key={item.page}
                onClick={() => navigateTo(item.page)}
                sx={{
                  my: 2,
                  mx: 1,
                  display: 'block',
                  borderRadius: '24px', // Full pill shape
                  px: 3,
                  color: currentPage === item.page ? theme.palette.primary.dark : theme.palette.text.secondary,
                  backgroundColor: currentPage === item.page ? theme.palette.primary.light : 'transparent',
                  fontWeight: currentPage === item.page ? 700 : 500,
                  '&:hover': {
                    backgroundColor: currentPage === item.page ? theme.palette.primary.light : theme.palette.action.hover,
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;

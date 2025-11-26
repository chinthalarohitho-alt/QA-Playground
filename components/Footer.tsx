import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';

const Footer: React.FC = () => {
  const theme = useTheme();
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: theme.palette.grey[900],
        color: 'white',
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body2" align="center">
          &copy; {new Date().getFullYear()} QA Playground. All rights reserved.
        </Typography>
        <Typography variant="caption" display="block" align="center" sx={{ mt: 1, color: 'grey.400' }}>
          Designed for comprehensive web application testing.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;

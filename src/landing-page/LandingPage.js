import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LogoCollection from './components/LogoCollection';
import Highlights from './components/Highlights';
import Pricing from './components/Pricing';
import Home from '../pages/home';
import Product from './components/Product';


export default function LandingPage() {
  // eslint-disable-next-line
  const [mode, setMode] = React.useState('light');
  const defaultTheme = createTheme({ palette: { mode } });

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Home />
      <Box sx={{ bgcolor: 'background.default' }}>
        <LogoCollection />
        <Divider />
        <Product />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
      </Box>

    </ThemeProvider>
  );
}

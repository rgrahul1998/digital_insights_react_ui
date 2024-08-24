import * as React from 'react';
import { alpha, Grid, Box, Container, Typography } from '@mui/material';
import Dataflow from '../../assets/svg/dataflow';
import Stack from '@mui/material/Stack';


export default function DataIntegration() {
  return (
    <Box
      id="product"
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
            : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        maxWidth="50%"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 3, sm: 5 },
          pb: { xs: 3, sm: 5 },
          maxWidth: '80%',
        }}
      >
        <Stack>
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 'clamp(3rem, 10vw, 4rem)',
              color: 'black'
            }}
          >
            Data Integration and Automation
          </Typography>
        </Stack>
        <Grid container spacing={4} sx={{ height: '100%' }}>
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              p: 3,
              textAlign: 'left', // Left text alignment for modern design
            }}
          >
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: 'primary.main',
                lineHeight: 1.2,
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              The flexibility of Excel. The power of automation.
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                lineHeight: 1.7,
                color: 'text.secondary',
                fontSize: { xs: '1rem', md: '1.125rem' },
              }}
            >
              Automation allows you to keep working in your Excel environment with 100% functionality. Automated consolidation and reporting save you time, letting you focus on the strategic insights that drive business growth.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={7}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 3,
            }}
          >
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Dataflow />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

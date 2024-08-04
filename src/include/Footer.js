import React from 'react';
import { Box, Button, Container, IconButton, Link, Stack, TextField, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';

const logoStyle = {
  width: '140px',
  height: 'auto',
};

export default function Footer() {
  const textColor = 'rgba(255, 255, 255, 0.8)';
  const backgroundColor = '#153859';

  return (
    <Box
      sx={{
        pt: 0,
        color: 'white',
        bgcolor: backgroundColor,
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 4, sm: 8 },
          py: { xs: 8, sm: 10 },
          textAlign: { sm: 'center', md: 'left' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              minWidth: { xs: '100%', sm: '60%' },
            }}
          >
            <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
              <Box sx={{ ml: '-15px' }}>
                <img
                  src="https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg"
                  style={logoStyle}
                  alt="logo of sitemark"
                />
              </Box>
              <Typography variant="body2" fontWeight={600} gutterBottom>
                Newsletter
              </Typography>
              <Typography variant="body2" mb={2}>
                Subscribe to our newsletter for weekly updates and promotions.
              </Typography>
              <Stack direction="row" spacing={1} useFlexGap>
                <TextField
                  id="outlined-basic"
                  hiddenLabel
                  size="small"
                  variant="outlined"
                  fullWidth
                  aria-label="Enter your email address"
                  placeholder="Your email address"
                  inputProps={{
                    autoComplete: 'off',
                    'aria-label': 'Enter your email address',
                  }}
                  sx={{
                    backgroundColor: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                  }}
                />
                <Button variant="contained" color="primary" sx={{ flexShrink: 0 }}>
                  Subscribe
                </Button>
              </Stack>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Box
              sx={{
                display: { xs: 'none', sm: 'flex' },
                flexDirection: 'column',
                gap: 1,
                color: textColor,
                size: 100
              }}
            >
              <Typography variant="body2" fontWeight={600} fontSize={20}>
                Product
              </Typography>
              <Link color={textColor} href="#" fontSize={18}>
                Features
              </Link>
              <Link color={textColor} href="#" fontSize={18}>
                Testimonials
              </Link>
              <Link color={textColor} href="#" fontSize={18}>
                Highlights
              </Link>
              <Link color={textColor} href="#" fontSize={18}>
                Pricing
              </Link>
              <Link color={textColor} href="#" fontSize={18}>
                FAQs
              </Link>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', sm: 'flex' },
                flexDirection: 'column',
                gap: 1,
                color: textColor,
              }}
            >
              <Typography variant="body2" fontWeight={600} fontSize={20}>
                Company
              </Typography>
              <Link color={textColor} href="#" fontSize={18}>
                About us
              </Link>
              <Link color={textColor} href="#" fontSize={18}>
                Careers
              </Link>
              <Link color={textColor} href="#" fontSize={18}>
                Press
              </Link>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', sm: 'flex' },
                flexDirection: 'column',
                gap: 1,
                color: textColor,
              }}
            >
              <Typography variant="body2" fontWeight={600} fontSize={20}>
                Legal
              </Typography>
              <Link color={textColor} href="#" fontSize={18}>
                Terms
              </Link>
              <Link color={textColor} href="#" fontSize={18}>
                Privacy
              </Link>
              <Link color={textColor} href="#" fontSize={18}>
                Contact
              </Link>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pt: { xs: 4, sm: 8 },
            width: '100%',
            borderTop: '1px solid',
            borderColor: 'divider',
            color: textColor,
          }}
        >
          <div>
            <Link color={textColor} href="#">
              Privacy Policy
            </Link>
            <Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
              &nbsp;•&nbsp;
            </Typography>
            <Link color={textColor} href="#">
              Terms of Service
            </Link>
          </div>
          <Stack
            direction="row"
            justifyContent="left"
            spacing={1}
            useFlexGap
            sx={{
              color: textColor,
            }}
          >
            <IconButton
              color="inherit"
              href="https://github.com/mui"
              aria-label="GitHub"
              sx={{ alignSelf: 'center', color: textColor }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://x.com/MaterialUI"
              aria-label="X"
              sx={{ alignSelf: 'center', color: textColor }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://www.linkedin.com/company/mui/"
              aria-label="LinkedIn"
              sx={{ alignSelf: 'center', color: textColor }}
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

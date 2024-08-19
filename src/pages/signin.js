import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import google_image from "../images/web_light_sq_SI@4x.png";
import API_URL from '../config';

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        API_URL + '/api/method/digital_insights.digital_insights.api.login.get_access_api_token',
        null,
        {
          params: {
            usr: email,
            pwd: password,
          },
          withCredentials: true,
        }
      );
      console.log(response)
      if (response.data.message.msg === 'success') {
        const token = response.data.message.data.access_token.access_token;
        const user = response.data.message.data.user;
        localStorage.setItem('access_token', token);
        localStorage.setItem('user', user);
  
        if (response.data.message.data.first_time_login) {
          navigate('/onboarding');
          window.location.reload()
        } else {
          navigate('/dashboard');
        }
      } else {
        setError('Invalid credentials, please try again.');
      }
    } catch (error) {
      console.error('There was an error!', error);
      setError('Internal server error');
    }
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign-in logic here
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {error && (
            <Box sx={{ width: '100%', mt: 2 }}>
              <Typography variant="body2" color="error" align="center">
                {error}
              </Typography>
            </Box>
          )}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={handleSignupClick}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ width: '100%', mt: 2, mb: 2 }}>or</Divider>

          <Button
            fullWidth
            variant="outlined"
            onClick={handleGoogleSignIn}
            sx={{
              mt: 1,
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textTransform: 'none',
            }}
          >
            <img
              src={google_image}
              alt="Google sign-in"
              style={{ width: '20px', height: '20px', marginRight: '8px' }}
            />
            Sign in with Google
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

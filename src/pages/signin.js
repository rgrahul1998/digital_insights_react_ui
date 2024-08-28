import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GoogleLogin } from '@react-oauth/google';
import API_URL from '../config';
import Logo from '../assets/brand/adlogo.png';

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

  const handleGoogleSignIn = async (credentialResponse) => {
    try {
      const { code } = credentialResponse;
      const response = await axios.post(`${API_URL}/api/method/frappe.integrations.oauth2_logins.login_via_google`, {
        code,
        state: JSON.stringify({ token: true, redirect_to: '/dashboard' }), // Add relevant state information
      });

      if (response.data.message === 'Logged In') {
        // Handle login success
        localStorage.setItem('access_token', response.data.access_token);
        navigate('/dashboard');
      } else {
        setError('Google login failed. Please try again.');
      }
    } catch (error) {
      console.error('Google login error:', error);
      setError('Google login failed. Please try again.');
    }
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
          <img
            src={Logo}
            alt="Logo"
            style={{
              width: '100px', // Adjust size as needed
              height: 'auto',
              borderRadius: '50%', // Optional: to give a circular appearance
              margin: '16px 0', // Adjust margin as needed
            }}
          />
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

          <GoogleLogin
            onSuccess={handleGoogleSignIn}
            onError={() => setError('Google login failed. Please try again.')}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

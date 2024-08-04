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
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const clientId = '482583231843-irfiph45ba2beifospage2augl8qejq4.apps.googleusercontent.com';

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/method/digital_insights.digital_insights.api.login.get_access_api_token',
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
        localStorage.setItem('access_token', token);

        if (response.data.message.first_time_login) {
          navigate('/onboarding');
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

  const handleGoogleSignInSuccess = async (response) => {
    try {
      const res = await axios.post(
        'http://127.0.0.1:8000/api/method/digital_insights.digital_insights.api.login_via_google.login_via_google',
        { token: response.credential }
      );
      if (res.data.status === 'success') {
        localStorage.setItem('access_token', res.data.token);
        if (res.data.first_time_login) {
          navigate('/onboarding');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError('Google Sign-In failed. Please try again.');
      }
    } catch (error) {
      console.error('Google Sign-In error:', error);
      setError('Internal server error');
    }
  };

  const handleGoogleSignInFailure = (response) => {
    console.error('Google Sign-In failed:', response);
    setError('Google Sign-In failed. Please try again.');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <GoogleOAuthProvider clientId={clientId}>
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

            <GoogleLogin
              onSuccess={handleGoogleSignInSuccess}
              onError={handleGoogleSignInFailure}
            />
          </Box>
        </Container>
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
}

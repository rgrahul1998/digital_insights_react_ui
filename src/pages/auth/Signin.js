import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Divider from "@mui/material/Divider"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import API_URL from "../../config"
import Logo from "../../assets/brand/adlogo.png"
import GoogleSignIn from "./GoogleLogin"

const defaultTheme = createTheme()

export default function SignIn() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const handleSignupClick = () => {
        navigate("/signup")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                API_URL +
                    "/api/method/digital_insights.digital_insights.api.login.get_access_api_token",
                null,
                {
                    params: {
                        usr: email,
                        pwd: password,
                    },
                    withCredentials: true,
                },
            )
            if (response.data.message.msg === "success") {
                const token = response.data.message.data.access_token.access_token
                const user = response.data.message.data.user
                const subscription = response.data.message.data.subscription
                localStorage.setItem("access_token", token)
                localStorage.setItem("user", user)
                localStorage.setItem("subscription", subscription)

                if (response.data.message.data.first_time_login === 1) {
                    navigate("/onboarding")
                    window.location.reload()
                } else {
                    navigate("/dashboard")
                }
            } else if (response.data.message.msg === "error") {
                setError(response.data.message.error)
            } else {
                setError("Invalid credentials, please try again.")
            }
        } catch (error) {
            console.error("There was an error!", error)
            setError("Internal server error")
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <img
                        src={Logo}
                        alt="Logo"
                        style={{
                            width: "100px",
                            height: "auto",
                            borderRadius: "50%",
                            margin: "16px 0",
                        }}
                    />
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    {error && (
                        <Box sx={{ width: "100%", mt: 2 }}>
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
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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

                    <Divider sx={{ width: "100%", mt: 2, mb: 2 }}>or</Divider>

                    {/* Render GoogleSignIn component */}
                    <GoogleSignIn setError={setError} />
                </Box>
            </Container>
        </ThemeProvider>
    )
}

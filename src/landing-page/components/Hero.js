import React from "react"
import { Container, Grid, Typography, Box, Button } from "@mui/material"
import Carousel from "react-material-ui-carousel"
import { useNavigate } from "react-router-dom" // Assuming you are using react-router for navigation

const items = [
    {
        name: "Image 1",
        description: "Description for Image 1",
        imgPath: "src/assets/images/hero_image.png",
    },
    {
        name: "Image 2",
        description: "Description for Image 2",
        imgPath: "src/assets/images/hero_image2.png",
    },
]

const Hero = () => {
    const navigate = useNavigate() // Hook for programmatic navigation

    const handleRequestDemoClick = () => {
        navigate("/request-demo")
    }

    return (
        <Box
            id="highlights"
            sx={{
                pt: { xs: 4, sm: 12 },
                pb: { xs: 8, sm: 16 },
                color: "white",
                bgcolor: "#153859",
            }}
        >
            <Container maxWidth="50%" sx={{ mt: 4, maxWidth: "80%" }}>
                <Grid container sx={{ height: "100%" }}>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            p: 3,
                            height: { xs: "auto", md: "600px" },
                            backgroundColor: "background.paper",
                            // borderRight: { md: '1px solid #e0e0e0' },
                            textAlign: { xs: "center", md: "center" }, // Center text alignment
                        }}
                    >
                        <Typography
                            variant="h3"
                            gutterBottom
                            sx={{ fontWeight: "bold", color: "primary.main" }}
                        >
                            Connect Leaders, Automate, Empower Decisions
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                mt: 2,
                                lineHeight: 1.7,
                                color: "text.secondary",
                                textAlign: "center",
                            }}
                        >
                            Transform your business with our platform. Streamline processes, gain
                            actionable insights, and foster relationships.
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                mt: 4,
                                py: 2,
                                px: 5,
                                backgroundColor: "#ff7f7f", // Light red color
                                color: "white",
                                fontSize: "1.25rem", // Make the text larger
                                "&:hover": {
                                    backgroundColor: "#ff4d4d", // Darker red on hover
                                },
                            }}
                            onClick={handleRequestDemoClick}
                        >
                            Request Demo
                        </Button>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            p: 3,
                            backgroundColor: "background.default",
                        }}
                    >
                        <Box sx={{ width: "100%" }}>
                            <Carousel
                                autoPlay
                                interval={5000}
                                indicators={false}
                                navButtonsAlwaysInvisible={true}
                            >
                                {items.map((item, i) => (
                                    <div
                                        key={i}
                                        style={{ position: "relative", textAlign: "center" }}
                                    >
                                        <img
                                            src={item.imgPath}
                                            alt={item.name}
                                            style={{ width: "100%", borderRadius: 8 }}
                                        />
                                    </div>
                                ))}
                            </Carousel>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Hero

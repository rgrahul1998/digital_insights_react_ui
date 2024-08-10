import React from 'react';
import { Container, Grid, Typography, Box, Button } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { useNavigate } from 'react-router-dom'; // Assuming you are using react-router for navigation

const items = [
    {
        name: "Image 1",
        description: "Description for Image 1",
        imgPath: "https://via.placeholder.com/300x200.png?text=Image+1",
    },
    {
        name: "Image 2",
        description: "Description for Image 2",
        imgPath: "https://via.placeholder.com/300x200.png?text=Image+2",
    },
    {
        name: "Image 3",
        description: "Description for Image 3",
        imgPath: "https://via.placeholder.com/300x200.png?text=Image+3",
    },
];

const Hero = () => {
    const navigate = useNavigate(); // Hook for programmatic navigation

    const handleRequestDemoClick = () => {
        navigate('/request-demo');
    };

    return (
        <Container maxWidth="50%" sx={{ mt: 4, maxWidth: '80%' }}>
            <Grid container sx={{ height: '100%' }}>
                <Grid 
                    item 
                    xs={12} 
                    md={6} 
                    sx={{ 
                        display: 'flex', 
                        flexDirection: 'column',
                        alignItems: 'center', 
                        justifyContent: 'center',
                        p: 3, 
                        height: { xs: 'auto', md: '600px' }, 
                        backgroundColor: 'background.paper',
                        // borderRight: { md: '1px solid #e0e0e0' },
                        textAlign: { xs: 'center', md: 'center' } // Center text alignment
                    }}
                >
                    <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        Connect Leaders, Automate, Empower Decisions
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 2, lineHeight: 1.7, color: 'text.secondary', textAlign: 'center' }}>
                        Transform your business with our platform. Streamline processes, gain actionable insights, and foster relationships.
                    </Typography>
                    <Button 
                        variant="contained" 
                        sx={{ 
                            mt: 4, 
                            py: 2, 
                            px: 5, 
                            backgroundColor: '#ff7f7f', // Light red color
                            color: 'white', 
                            fontSize: '1.25rem', // Make the text larger
                            '&:hover': {
                                backgroundColor: '#ff4d4d', // Darker red on hover
                            }
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
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        p: 3,
                        backgroundColor: 'background.default'
                    }}
                >
                    <Box sx={{ width: '100%' }}>
                        <Carousel navButtonsAlwaysVisible autoPlay interval={5000} indicators={false}>
                            {items.map((item, i) => (
                                <div key={i} style={{ position: 'relative', textAlign: 'center' }}>
                                    <img src={item.imgPath} alt={item.name} style={{ width: '100%', borderRadius: 8 }} />
                                    {/* Uncomment to display name and description over the images */}
                                    {/* 
                                    <Typography 
                                        variant="h6" 
                                        sx={{ 
                                            position: 'absolute', 
                                            bottom: 16, 
                                            left: '50%', 
                                            transform: 'translateX(-50%)', 
                                            backgroundColor: 'rgba(0, 0, 0, 0.6)', 
                                            color: 'white', 
                                            p: 1, 
                                            borderRadius: 1 
                                        }}
                                    >
                                        {item.name}
                                    </Typography>
                                    <Typography 
                                        variant="body2" 
                                        sx={{ 
                                            position: 'absolute', 
                                            bottom: 4, 
                                            left: '50%', 
                                            transform: 'translateX(-50%)', 
                                            backgroundColor: 'rgba(0, 0, 0, 0.6)', 
                                            color: 'white', 
                                            p: 1, 
                                            borderRadius: 1 
                                        }}
                                    >
                                        {item.description}
                                    </Typography> 
                                    */}
                                </div>
                            ))}
                        </Carousel>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Hero;

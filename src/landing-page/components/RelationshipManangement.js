import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Carousel from 'react-material-ui-carousel';

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
  }
];

export default function RelationshipManangement() {
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

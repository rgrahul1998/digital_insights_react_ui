import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function AssitantAi() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: '#153859',
      }}
    >
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
                        textAlign: { xs: 'center', md: 'center' } // Center text alignment
                    }}
                >
                    <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        Introducing Assistant AI
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 2, lineHeight: 1.7, color: 'text.secondary', textAlign: 'center' }}>
                        Use your own words to ask the assistant for answers and insights from any data source you select. Then ask it to build charts and dashboards so that you can quickly visualize and share information.
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
                        <video
                            width="100%"
                            autoPlay
                            loop
                            muted
                            playsInline
                            controls={false}
                            style={{ width: '100%', borderRadius: 8 }} // Rounded corners and subtle shadow for the video
                        >
                            <source src="src\assets\videos\demo_video.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    </Box>
  );
}

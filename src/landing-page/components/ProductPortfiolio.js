import React from 'react';
import { Grid, Card, CardContent, Typography, Link, Container } from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import LayersIcon from '@mui/icons-material/Layers';
import GroupIcon from '@mui/icons-material/Group';

const ProductPortfolio = () => {
  const solutions = [
    {
      icon: <ComputerIcon style={{ fontSize: 40 }} />,
      title: 'Automation',
      description: 'Streamline your processes with AI-powered tools.',
      link: 'Learn More',
    },
    {
      icon: <LayersIcon style={{ fontSize: 40 }} />,
      title: 'AI Intelligence',
      description: 'Gain actionable insights with analytics.',
      link: 'Learn More',
    },
    {
      icon: <GroupIcon style={{ fontSize: 40 }} />,
      title: 'Relationship Management',
      description: 'Make connections with stakeholders.',
      link: 'Learn More',
    },
  ];

  return (
    <Container maxWidth="50%" sx={{ mt: 4, mb: 4, maxWidth: '80%' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Comprehensive Solutions for Modern Business
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {solutions.map((solution, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', height: "250px", alignItems: 'center', bgcolor:'#f5f9fc'}}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                {solution.icon}
                <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                  {solution.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  {solution.description}
                </Typography>
                <Link href="#" variant="body2" sx={{ mt: 2 }}>
                  {solution.link}
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductPortfolio;

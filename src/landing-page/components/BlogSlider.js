import React, { useState, useEffect, useRef } from 'react';
import { Box, Card, CardContent, Typography, Container } from '@mui/material';

const blogs = [
  {
    title: 'Card title 1',
    description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
    updated: 'Last updated 3 mins ago',
  },
  {
    title: 'Card title 2',
    description: 'This card has supporting text below as a natural lead-in to additional content.',
    updated: 'Last updated 3 mins ago',
  },
  {
    title: 'Card title 3',
    description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.',
    updated: 'Last updated 3 mins ago',
  },
  {
    title: 'Card title 4',
    description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.',
    updated: 'Last updated 3 mins ago',
  },
];

const BlogSlider = () => {
  const [translateX, setTranslateX] = useState(0);
  const sliderRef = useRef(null);

  const slideWidth = 100 / 4; // Width of each card as a percentage

  useEffect(() => {
    const interval = setInterval(() => {
      setTranslateX((prevTranslateX) => prevTranslateX - slideWidth);
    }, 3000); // Slide every 3 seconds

    return () => clearInterval(interval);
  }, [slideWidth]);

  useEffect(() => {
    if (Math.abs(translateX) >= 100) {
      setTimeout(() => {
        setTranslateX(0);
      }, 500); // After animation finishes, reset position
    }
  }, [translateX]);

  return (
    <Container maxWidth="50%" sx={{ mt: 4, mb: 4, overflow: 'hidden', maxWidth: '80%' }}>
      <Box
        ref={sliderRef}
        sx={{
          display: 'flex',
          transform: `translateX(${translateX}%)`,
          transition: translateX === 0 ? 'none' : 'transform 0.5s ease-in-out',
        }}
      >
        {blogs.concat(blogs).map((blog, index) => (
          <Box
            key={index}
            sx={{
              minWidth: `${slideWidth}%`, // Ensures equal-width cards
              boxSizing: 'border-box',
              padding: 2,
            }}
          >
            <Card
              variant="outlined"
              sx={{ display: 'flex', flexDirection: 'column', height: '250px', alignItems: 'center', bgcolor: '#f5f9fc' }}
            >
              <CardContent
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
              >
                <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  {blog.description}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default BlogSlider;

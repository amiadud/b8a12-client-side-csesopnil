import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';


const AboutUs = () => {

  return (
    <div className='my-4'>
        <Typography variant="h4"  align='center' gutterBottom>
          <span >About Us</span>
        </Typography>
        <Paper >
          <Typography variant="body1" paragraph>
            Welcome to our pet adoption platform! We are dedicated to connecting loving
            homes with pets in need. Our mission is to make the adoption process simple,
            enjoyable, and rewarding for both pets and adopters.
          </Typography>
          <div className='text-4xl'>
          <Typography variant="h4" align='center' paragraph>
            How it works:
          </Typography>
          </div>
          <Grid container spacing={2} >
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">1. Explore Pets</Typography>
              <Typography variant="body2">
                Browse through our collection of adorable pets available for adoption.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">2. Submit an Application</Typography>
              <Typography variant="body2">
                When you find a pet you love, submit an adoption application to start the
                process.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">3. Meet Your New Companion</Typography>
              <Typography variant="body2">
                Once your application is approved, arrange a meeting with the pet to ensure a
                perfect match.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">4. Complete the Adoption</Typography>
              <Typography variant="body2">
                Finalize the adoption process and welcome your new furry friend into your
                home.
              </Typography>
            </Grid>
          </Grid>
          <div className='mt-5'>
          <Typography  variant="h4" align='center' paragraph>
            Why we created this website:
          </Typography>
          </div>
          <Typography variant="body1" paragraph>
            We believe that every pet deserves a loving home, and every person deserves the
            joy and companionship that a pet can bring. Our platform aims to simplify the
            adoption process, making it accessible to everyone and promoting responsible
            pet ownership.
          </Typography>
        </Paper>
    </div>
  );
};

export default AboutUs;

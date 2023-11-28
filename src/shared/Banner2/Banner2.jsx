import React from 'react';
import { Card,  CardContent, CardMedia, Grid, Typography } from '@mui/material';

const Banner2 = () => {

  return (
    <div data-aos="zoom-in-up" >
       <h2 className=' text-3xl font-semibold mt-4  -mb-5 dark:text-white text-center'>Inspiration </h2>
      <Typography className='text-white' variant="h4" gutterBottom>
        Give a Pet a Better Life!
      </Typography>
      <Typography className='text-white' variant="subtitle1" gutterBottom>
        Find your perfect companion and make a difference in their lives.
      </Typography>

      <Grid container spacing={3} justify="center">
        {/* Inspirational Images and Text Cards */}
        <Grid item xs={12} sm={6} md={4}>
          <Card >
            <img src="https://i.ibb.co/fFtfhJz/inspire.jpg" alt="" />
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Inspire
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Your love can inspire positive change in a pet's life.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card >
            <img src="https://imgdb.net/storage/uploads/b75b8435bb118af13a43fb13a9a87b38e4f1cf654f041d6ed11d13b9a5d156f4.jpg" alt="" />
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Adopt
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Give a loving home to a pet in need of care and attention.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card >
            <img src="https://i.ibb.co/sHJSw9R/Transform-pet.jpg" alt="" />
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Transform
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Your kindness can transform a pet's life forever.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Banner2;

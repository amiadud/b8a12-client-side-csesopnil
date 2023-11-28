import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import SocialLogin from './SocialLogin';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';


const Login = () => {

  const {userlogin} = useAuth();
  const location = useLocation()
  const navigate = useNavigate();

  const from = location?.state?.from?.pathname || "/"

  // State to store form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const email = formData.email
    const password = formData.password

    userlogin(email, password)
        .then(result => {
          console.log(result.user);
          Swal.fire({
            title: "User Login SuccessFull",
            showConfirmButton: false,
            icon: "success",
            timer: 1500
          });
          navigate(from, {replace: true})

        })
        .catch(err => {
          console.log(err.message);
        })

  };

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          class="w-full"
          alt="Sample image" />
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Enter your Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleInputChange}
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
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
      Don't have an account? <Link to={'/register'} className='font-semibold text-green-600'>Register</Link>
      <SocialLogin/>
    </Container>
  );
};

export default Login;

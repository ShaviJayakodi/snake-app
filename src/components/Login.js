import React, { useState } from 'react';
import { TextField, Typography, Container, Grid, Button, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    salutation: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/snakeapp/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const responseData = response.data.payload;
      console.log(responseData);
      console.log(responseData.isFirstLogin);
      if(responseData){
        localStorage.setItem('user', JSON.stringify(responseData));
        if(responseData.isFirstLogin === 1){
          // Redirect to ChangePassword component
          navigate('/changePassword');
        } else {
          navigate('/home');
        }
      } else {
        console.log('false');
      }
      // Handle successful login response
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle login error
    }
  };
  return (
    <Container maxWidth="sm" style={{ background: '#C6EBC5', padding: '15px', marginTop: '25px', borderRadius: '15px', textAlign: 'center', justifyContent: 'center', minHeight: '45vh' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="E-mail / Username"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              margin="none"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              type={showPassword ? 'text' : 'password'}
              required
              margin="none"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ padding: 1, marginTop: 2 }}>
          Login
        </Button>
      </form>
    </Container>
  );
}

export default Login;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

useEffect(() => {
    // Fetch user details from local storage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
}, []);
    
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Check if user is fetched from local storage
        if (!user || !user.enEmail) {
            console.error('User details not found');
            return;
        }

        if(formData.newPassword === formData.confirmNewPassword){
            axios.post('http://localhost:8080/user/changePassword', {
                email: user.enEmail,
                curPassword: formData.currentPassword,
                newPassword: formData.newPassword  
              })
              .then(function (response) {
                console.log(response);
                Swal.fire({
                  title:  response.data.messages[0],
                  icon: "success"
                });
                // Reset the form data
                setFormData({
                  currentPassword: '',
                  newPassword: '',
                  confirmNewPassword: ''
                });
                
                navigate('/home');    
              })
              .catch(function (error) {  
                console.error(error);  
                Swal.fire({
                  icon: "error",
                  title: "Error!",
                  text: error.response.data.details ,
                });
              });
            }
            else{
                Swal.fire({
                  icon: "error",
                  title: "Password Not Matched!",
                });
            }
      
    } catch (error) {
      console.error('Error changing password:', error);
      // Handle password change error
    }
  };


  return (
    <Container maxWidth="sm" style={{ marginTop: '25px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Change Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Current Password"
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="New Password"
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Confirm New Password"
              type="password"
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Change Password
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default ChangePassword;

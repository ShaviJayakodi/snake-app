import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid, MenuItem } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';

function Registration() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    salutation: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    axios.post('http://localhost:8080/admin/newAdmin', {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      salutation: formData.salutation
    },{
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
      Swal.fire({
        title:  response.data.messages[0],
        text: "Confirmation Email Will Send to the New Admin",
        icon: "success"
      });
    })
    .catch(function (errResponse) {    
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errResponse.response.data.details ,
      
      });
    });
    
  };

  return (
    <Container maxWidth="sm" style ={{background:'#C6EBC5', padding:'15px', marginTop:'25px' , borderRadius:'15px' ,  textAlign: 'center', justifyContent: 'center',
    minHeight: '65vh' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Admin Registration
      </Typography>
      <form onSubmit={handleSubmit} >
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <TextField
              select
              label="Salutation"
              name="salutation"
              value={formData.salutation}
              onChange={handleChange}
              fullWidth
              margin="none"
            >
              <MenuItem value="Mr.">Mr.</MenuItem>
              <MenuItem value="Mrs.">Mrs.</MenuItem>
              <MenuItem value="Miss">Miss</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              margin="none"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              margin="none"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="none"
            />
          </Grid>
          
          {/* <Grid item xs={6}>
            <TextField
              label="Date of Birth"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Postal Code"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid> */}
        </Grid>
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ padding: 1, marginTop:2 }}>
          Submit
         </Button>
      </form>
    </Container>
  );
}

export default Registration;

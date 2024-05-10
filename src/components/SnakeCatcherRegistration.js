import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid, MenuItem, Divider } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';
import TemporaryDrawer from './TemporaryDrawer';

function Registration() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    salutation: '',
    dob: '',
    street :'',
    city:'',
    postalCode:'',
    contactNo :''
  });

   const cities = [
    'Ambalangoda', 'Ampara', 'Anuradhapura', 'Bandarawela', 'Batticaloa', 'Colombo', 'Dambulla', 'Galle', 'Hambantota',
    'Haputale', 'Horana', 'Jaffna', 'Kalutara', 'Kalmunai', 'Kandy', 'Kegalle', 'Kurunegala', 'Mannar', 'Matara',
    'Negombo', 'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
  ].sort();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.post('http://localhost:8080/snakeCatcher/makingAnRequest', {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      salutation: formData.salutation,
      dob: formData.dob,
      street: formData.street,
      city : formData.city,
      postalCode: formData.postalCode,
      contactNo : formData.contactNo
    },{
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
      Swal.fire({
        title:  response.data.messages[0],
        icon: "success"
      });
      // Reset the form data
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        salutation: '',
        dob: '',
        street: '',
        city: '',
        postalCode: '',
        contactNo :''
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
  <div>
    <TemporaryDrawer/>
    <Container maxWidth="sm" style ={{background:'#C6EBC5', padding:'15px', marginTop:'25px' , borderRadius:'15px' ,  textAlign: 'center', justifyContent: 'center',
    minHeight: '65vh' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Snake Catcher Registration
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
              required
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Contact No:"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              fullWidth
              margin="none"
              required

            />
          </Grid>
          
          <Grid item xs={6}>
            <TextField
              label="Date of Birth"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              fullWidth
              margin="none"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Divider/>
          <Grid item xs={12}>
            <TextField
              label="Street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              fullWidth
              margin="none"
            />
          </Grid>
          <Grid item xs={6}>
          <TextField
            select
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            fullWidth
            margin="none"
          >
            {cities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

          <Grid item xs={6}>
            <TextField
              label="Postal Code"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              fullWidth
              margin="none"
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ padding: 1, marginTop:2 }}>
          Submit
         </Button>
      </form>
    </Container>
    </div>
  );
}

export default Registration;

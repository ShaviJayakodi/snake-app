import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Grid, MenuItem } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';

function UpdateAdmin() {
  const [formData, setFormData] = useState({
    regNo:'',
    email: '',
    firstName: '',
    lastName: '',
    salutation: ''
  });

  useEffect(() => {
    // Fetch admin data from API and set the form data
    // You can use the admin ID from localStorage or any other method to fetch the data
    const regNo = JSON.parse(localStorage.getItem('user')).regNo;
    axios.get(`http://localhost:8080/admin/getAdminByRegNo?regNo=${regNo}`)
      .then(function (response) {
        const adminData = response.data.payload;
        setFormData({
          regNo: adminData.regNo,
          adminId : adminData.adminId,
          email: adminData.email,
          firstName: adminData.firstName,
          lastName: adminData.lastName,
          salutation: adminData.salutation,
          status:adminData.status
        });
      })
      .catch(function (error) {
        console.error('Error fetching admin data:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //const regNo = JSON.parse(localStorage.getItem('user')).regNo;
    axios.put(`http://localhost:8080/admin/updateAdmin`, {
      adminId:formData.adminId,
      regNo : formData.regNo,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      salutation: formData.salutation,
      status:formData.status
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
    })
    .catch(function (errResponse) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errResponse.response.data.details,
      });
    });
  };

  return (
    <Container maxWidth="sm" style ={{background:'#C6EBC5', padding:'15px', marginTop:'25px' , borderRadius:'15px' ,  textAlign: 'center', justifyContent: 'center',
    minHeight: '65vh' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Update Admin
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
              disabled // Disable email field if you don't want it to be editable
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ padding: 1, marginTop:2 }}>
          Update
         </Button>
      </form>
    </Container>
  );
}

export default UpdateAdmin;

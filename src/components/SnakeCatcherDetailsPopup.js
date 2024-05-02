import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem, Grid } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';

function SnakeCatcherDetailsPopup({ open, handleClose, snakeCatcher, setSnakeCatchers }) {
  const [formData, setFormData] = useState({
    regNo:snakeCatcher.regNo,
    snakeCatcherId:snakeCatcher.snakeCatcherId,
    status:snakeCatcher.status,
    email: snakeCatcher.email,
    firstName: snakeCatcher.firstName,
    lastName: snakeCatcher.lastName,
    salutation: snakeCatcher.salutation,
    dob: snakeCatcher.dob,
    age:snakeCatcher.age,
    street: snakeCatcher.street,
    city: snakeCatcher.city,
    postalCode: snakeCatcher.postalCode,
    contactNo: snakeCatcher.contactNo
  });

  const [cities, setCities] = useState([
    'Ambalangoda', 'Ampara', 'Anuradhapura', 'Bandarawela', 'Batticaloa', 'Colombo', 'Dambulla', 'Galle', 'Hambantota',
    'Haputale', 'Horana', 'Jaffna', 'Kalutara', 'Kalmunai', 'Kandy', 'Kegalle', 'Kurunegala', 'Mannar', 'Matara',
    'Negombo', 'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
  ].sort());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:8080/snakeCatcher/update`, {
      regNo: formData.regNo,
      status: formData.status,
      snakeCatcherId: snakeCatcher.snakeCatcherId,
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      salutation: formData.salutation,
      dob: formData.dob,
      age: formData.age,
      street: formData.street,
      city: formData.city,
      postalCode: formData.postalCode,
      contactNo: formData.contactNo
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(function (response) {
        Swal.fire({
          title: response.data.messages[0],
          icon: "success"
        });
        handleClose();
        // Update snake catchers list
        setSnakeCatchers((prev) => {
          const index = prev.findIndex((item) => item.snakeCatcherId === snakeCatcher.snakeCatcherId);
          if (index !== -1) {
            const updatedSnakeCatchers = [...prev];
            updatedSnakeCatchers[index] = { ...updatedSnakeCatchers[index], ...formData };
            return updatedSnakeCatchers;
          }
          return prev;
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

  const handleDelete = (e) => {
    e.preventDefault();
  
    axios.delete(`http://localhost:8080/snakeCatcher/deleteSnakeCatcher?snakeCatcherId=${snakeCatcher.snakeCatcherId}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(function (response) {
        Swal.fire({
          title: response.data.messages[0],
          icon: "success"
        }).then(() => {
          handleClose(); // Close the dialog
          setSnakeCatchers((prev) => prev.filter((item) => item.snakeCatcherId !== snakeCatcher.snakeCatcherId)); // Update snake catchers list
        });
      })
      .catch(function (errResponse) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errResponse.response.data.details,
        });
      })
      .finally(() => {
        handleClose();
      });
  };
  
  
  

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontSize: 24, textAlign: 'center' }}>Manage Snake Catcher</DialogTitle>
      <DialogContent>
      <Grid container spacing={2}>
        <Grid item xs={3}>
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
        <Grid item xs={4.5}>
            <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            margin="none"
            />
        </Grid>
        <Grid item xs={4.5}>
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
            disabled
            />
        </Grid>
        <Grid item xs={12}>
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
        <Grid item xs={6}>
            <TextField
            label="Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            fullWidth
            margin="none"
            InputLabelProps={{
                shrink: true,
            }}
            />
        </Grid>
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
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ margin: 5 }}>
          Update
        </Button>
        <Button onClick={handleDelete} variant="contained" color="error" sx={{ margin: 5 }}>
          Delete
        </Button>
        <Button onClick={handleClose} variant="contained" color="secondary" sx={{ margin: 5 }}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SnakeCatcherDetailsPopup;
import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid, MenuItem, Divider, Select, InputLabel } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';

function SnakeDataForm() {
  const [formData, setFormData] = useState({
    snakeName: '',
    venomousOrNot: '',
    venomousLevel: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('snakeName', formData.snakeName);
    formDataToSend.append('venomousOrNot', formData.venomousOrNot);
    formDataToSend.append('venomousLevel', formData.venomousLevel);
    formDataToSend.append('image', formData.image);

    axios.post('http://localhost:8080/snakeCatcher/snakeData', formDataToSend)
      .then(function (response) {
        Swal.fire({
          title: response.data.messages[0],
          icon: "success"
        });
        // Reset the form data
        setFormData({
          snakeName: '',
          venomousOrNot: '',
          venomousLevel: '',
          image: null
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
    <Container maxWidth="sm" style={{ background: '#C6EBC5', padding: '15px', marginTop: '25px', borderRadius: '15px', textAlign: 'center', justifyContent: 'center', minHeight: '65vh' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Snake Data Collection Form
      </Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Snake Name"
              name="snakeName"
              value={formData.snakeName}
              onChange={handleChange}
              fullWidth
              margin="none"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="venomous-or-not-label">Venomous or Not</InputLabel>
            <Select
              labelId="venomous-or-not-label"
              name="venomousOrNot"
              value={formData.venomousOrNot}
              onChange={handleChange}
              fullWidth
              margin="none"
              required
            >
              <MenuItem value={1}>Venomous</MenuItem>
              <MenuItem value={0}>Non-venomous</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="venomous-level-label">Venomous Level</InputLabel>
            <Select
              labelId="venomous-level-label"
              name="venomousLevel"
              value={formData.venomousLevel}
              onChange={handleChange}
              fullWidth
              margin="none"
              required
            >
              <MenuItem value={0}>Non</MenuItem>
              <MenuItem value={1}>Low</MenuItem>
              <MenuItem value={2}>Mildly</MenuItem>
              <MenuItem value={3}>High</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
  <input
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    required
    multiple={false}
  />
</Grid>

        </Grid>
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ padding: 1, marginTop: 2 }}>
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default SnakeDataForm;

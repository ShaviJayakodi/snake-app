import React, { useState } from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

function SnakeIdentification() {
  const [formData, setFormData] = useState({
    image: null,
  });

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: URL.createObjectURL(e.target.files[0])
    });
  };

  const handleCapture = async () => {
    if ("mediaDevices" in navigator) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        const mediaStreamTrack = stream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(mediaStreamTrack);

        const photo = await imageCapture.takePhoto();
        setFormData({
          ...formData,
          image: URL.createObjectURL(photo)
        });

        mediaStreamTrack.stop(); // Stop the camera stream
      } catch (error) {
        console.error('Error capturing photo:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to capture photo. Please try again.',
          icon: 'error'
        });
      }
    } else {
      console.error('getUserMedia not supported');
      Swal.fire({
        title: 'Error!',
        text: 'Your device does not support camera capture.',
        icon: 'error'
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Use formData.image to send the captured image to the server
    // ...
  };

  return (
    <Container maxWidth="sm" style={{ background: '#C6EBC5', padding: '15px', marginTop: '25px', borderRadius: '15px', textAlign: 'center', justifyContent: 'center', minHeight: '65vh' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Snake Identification
      </Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <label htmlFor="contained-button-file">
              <Button variant="contained" component="span" fullWidth>
                Upload Photo
              </Button>
            </label>
            <input
              accept="image/*"
              id="contained-button-file"
              type="file"
              style={{ display: 'none' }}
              onChange={handleImageChange}
              capture="camera"
            />
          </Grid>
        </Grid>
        <Button type="button" variant="contained" color="primary" onClick={handleCapture} fullWidth sx={{ padding: 1, marginTop: 2 }}>
          Capture Photo
        </Button>
        <Grid item xs={12}>
            {formData.image && (
              <img src={formData.image} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
            )}
          </Grid>
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ padding: 1, marginTop: 2 }}>
          Identify Snake
        </Button>
      </form>
    </Container>
  );
}

export default SnakeIdentification;

import React, { useState } from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

function SnakeIdentification() {
  const [formData, setFormData] = useState({
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file
      });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  
  
  const handleCapture = async () => {
    if ("mediaDevices" in navigator) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        const mediaStreamTrack = stream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(mediaStreamTrack);
  
        const photo = await imageCapture.takePhoto();
  
        // Create a Blob object from the captured photo data
        const blob = new Blob([photo], { type: 'image/jpeg' });
  
        setFormData({
          ...formData,
          image: blob
        });
  
        setPreviewImage(URL.createObjectURL(blob)); // Set the preview image URL
  
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
  
    if (!formData.image) {
      Swal.fire({
        title: 'Error!',
        text: 'Please upload or capture an image first.',
        icon: 'error'
      });
      return;
    }
  
    try {
      const image = await loadImageBase64(formData.image);
  
      axios({
        method: "POST",
        url: "https://detect.roboflow.com/snake-classification/2",
        params: {
          api_key: "cilVdlAMd3xhibi0AKHa"
        },
        data: image,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(function(response) {
        console.log(response.data);
        console.log(response.data.predictions[0].class);
      })
      .catch(function(error) {
        console.log(error.message);
      });
  
      // Optionally, you can reset the form data after successful submission
      setFormData({
        image: null
      });
    } catch (error) {
      console.error('Error identifying snake:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to identify snake. Please try again.',
        icon: 'error'
      });
    }
  };
  
  const loadImageBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file instanceof Blob ? file : file[0]);
    });
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
          {previewImage && (
            <img src={previewImage} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
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

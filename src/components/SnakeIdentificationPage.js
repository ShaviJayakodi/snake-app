import React, { useState } from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

function SnakeIdentification() {
  const [formData, setFormData] = useState({
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [snakeData, setSnakeData] = useState(null);

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
    // ... existing code
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
        const classification = response.data.predictions[0].class;
        axios.get(`http://localhost:8080/snakeData/getSnakesByName?snakeName=${classification}`)
        .then(function (response) {
          setSnakeData(response.data.payload);
          let venomousButton = '';
          let treat = '';
            if (response.data.payload.venomousOrNot === "Venomous") {
              treat = ` <p>
                          <h3>If Bitten, Please Do:</h3>
                          - Go to the nearest hospital as all government hospitals possess anti-venom.<br/>
                          - Apply a bandage on the bite site covering the bite and the area around it.<br/>
                          - The bandage should not be tight.<br/>
                          - Avoid unnecessary and sharp movements.<br/>
                          - Place a splint while bandaging to avoid joint movements.<br/>
                          - Walking or running is not advisable.<br/>
                          - In case of a bite on the hand, bandage the arm and put it in a sling from the shoulder.<br/>
                      </p>`
              venomousButton = `<br/><button class="swal2-confirm swal2-styled" onclick="window.location.href='/your-venomous-page'">Find a Snake Catcher</button>`;
            } else{
              treat = `<p>
                          <h3>If Bitten, Please Do:</h3>
                          - Wash the bite area gently with soap and water to prevent infection.<br/>
                          - If the bite caused any bleeding, apply a clean cloth or bandage to the wound and elevate the affected limb if possible.<br/>
                          - Use a cold pack or a cloth soaked in cold water to reduce swelling and pain.<br/>
                          - Keep an eye on the bite area for any signs of infection, such as increased redness, swelling, or pus.<br/>
                          - If the bite is painful, you can use over-the-counter pain relievers like acetaminophen or ibuprofen.<br/>
                          - While non-venomous snake bites are usually not serious, it's still a good idea to seek medical attention to ensure proper wound care and to rule out any complications.<br/>
                      </p>`
            }

          Swal.fire({
            title: 'Identification Result',
            html: `
              <p>Snake Name: ${response.data.payload.snakeName}</p>
              <p>Venomous or Not: ${response.data.payload.venomousOrNot}</p>
              <p>Venomous Level: ${response.data.payload.venomousLevel}</p>
              ${treat}
              ${venomousButton}
            `,
            
          });
        })
        .catch(function (error) {
          console.error('Error fetching snake data:', error);
        });
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

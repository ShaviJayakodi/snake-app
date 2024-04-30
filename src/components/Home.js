import React, { useEffect, useRef } from 'react';
import { Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import TemporaryDrawer from './TemporaryDrawer';

const spanStyle = {
  padding: '20px',
  background: '#efefef',
  color: '#000000'
};

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '400px'
};

const images = [
  'https://images.pexels.com/photos/80474/grass-snake-snake-serpentes-natrix-80474.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/162347/snake-young-animal-cute-slim-162347.jpeg?auto=compress&cs=tinysrgb&w=600',
];

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const zoomRef = useRef(null);
  const sliderHeight = isMobile ? '30vh' : '60vh'; // Set the slider height based on screen size

  useEffect(() => {
    // Ensure that the Zoom component is properly unmounted
    return () => {
      zoomRef.current = null;
    };
  }, []);

  const textStyles = {
    color: '#707B7C', 
    fontFamily: 'Poppins', 
    fontSize: '16px', 
  };
  const textStylesHead = {
    color: '#707B7C', 
    fontFamily: 'Poppins', 
    fontSize: '20px', 
  };

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '50px', boxSizing: 'border-box', position: 'relative' }}>
      <TemporaryDrawer/>
      <Typography variant="body1" align="center" paragraph  style={textStylesHead}>
        <h2>
          Save the Lives of Snakes & Be Safe from Them. 
        </h2>
      </Typography>
      <div style={{ textAlign: 'center', borderRadius:5}}>
        <Zoom scale={0.4} ref={zoomRef}>
          {images.map((each, index) => (
            <img key={index} style={{ width: "60%", height: sliderHeight }} src={each} />
          ))}
        </Zoom>
      </div>
      <Typography variant='body1' align='center' paragraph style={textStyles}>
        <h2>
          Vision
        </h2>
        "To create a world where snakes are protected, ensuring their survival and our safety."
      </Typography>
      <Typography variant='body1' align='center' paragraph style={textStyles}>
        <h2>
          Mission
        </h2>
        Our mission is to educate communities about the <br/>
        importance of snakes in the ecosystem, promote coexistence through safe practices,<br/>
         and provide humane solutions for snake-human conflicts. <br/>
         By fostering understanding and respect, we strive to save the lives of snakes and <br/>
         protect human lives from unnecessary harm.
      </Typography>
      <Button variant="contained" color="primary" size="large" fullWidth>
        Get Started
      </Button>
      
    </div>
  );
};

export default HomePage;

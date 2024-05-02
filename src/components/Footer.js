import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{
      position: 'relative',
      bottom: 0,
      left: 0,
      width: '100%',
      bgcolor: '#2C3E50',
      color: '#707B7C',
      py: 2,
      textAlign: 'center',
      fontFamily: 'Poppins',
    }}>
      <Typography variant="body1">
        © {new Date().getFullYear()} Savishka D Jayakodi. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;

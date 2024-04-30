import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Typography } from '@mui/material';

const SearchSnakeCatcher = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [snakeCatchers, setSnakeCatchers] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const cities = [
    'Ambalangoda', 'Ampara', 'Anuradhapura', 'Bandarawela', 'Batticaloa', 'Colombo', 'Dambulla', 'Galle', 'Hambantota',
    'Haputale', 'Horana', 'Jaffna', 'Kalutara', 'Kalmunai', 'Kandy', 'Kegalle', 'Kurunegala', 'Mannar', 'Matara',
    'Negombo', 'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
  ].sort();

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    fetchSnakeCatchers(event.target.value);
  };

  const fetchSnakeCatchers = async (city) => {
    try {
      const response = await fetch(`backend/api/snake-catchers?city=${city}`);
      const data = await response.json();
      if (data.length > 0) {
        setSnakeCatchers(data);
        setShowTable(true);
        setErrorMessage('');
      } else {
        setShowTable(false);
        setErrorMessage(`No snake catchers found in ${city}`);
      }
    } catch (error) {
      console.error('Error fetching snake catchers:', error);
    }
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="city-label">Select City</InputLabel>
        <Select
          labelId="city-label"
          id="city-select"
          value={selectedCity}
          label="Select City"
          onChange={handleCityChange}
        >
          {cities.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {showTable ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Contact Number</TableCell>
                <TableCell>City</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {snakeCatchers.map((snakeCatcher) => (
                <TableRow key={snakeCatcher.id}>
                  <TableCell>{snakeCatcher.name}</TableCell>
                  <TableCell>{snakeCatcher.contactNumber}</TableCell>
                  <TableCell>{snakeCatcher.city}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" color="error">
          {errorMessage}
        </Typography>
      )}
    </div>
  );
};

export default SearchSnakeCatcher;

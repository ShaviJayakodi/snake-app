import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import TemporaryDrawer from './TemporaryDrawer';

const SearchSnakeCatcher = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [snakeCatchers, setSnakeCatchers] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedSnakeCatcher, setSelectedSnakeCatcher] = useState(null);
  const [open, setOpen] = useState(false);

  const cities = [
    'Ambalangoda', 'Ampara', 'Anuradhapura', 'Bandarawela', 'Batticaloa', 'Colombo', 'Dambulla', 'Galle', 'Hambantota',
    'Haputale', 'Horana', 'Jaffna', 'Kalutara', 'Kalmunai', 'Kandy', 'Kegalle', 'Kurunegala', 'Mannar', 'Matara',
    'Negombo', 'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
  ].sort();

  const handleCityChange = async (event) => {
    const city = event.target.value;
    setSelectedCity(city);
    try {
      axios.get(`http://localhost:8080/snakeCatcher/getAllSnakeCatchersByCity?city=${city}`)
        .then(function (response) {
          const data = response.data.payload;
          if (data.length > 0) {
            setSnakeCatchers(data);
            setShowTable(true);
            setErrorMessage('');
          } else {
            setShowTable(false);
            setErrorMessage(`No snake catchers found in ${city}`);
          }
        })
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: error.response.data.details,
          });
        });
    } catch (error) {
      console.error('Error fetching snake catchers:', error);
      setShowTable(false);
      setErrorMessage('Failed to fetch snake catchers. Please try again.');
    }
  };

  const handleView = (snakeCatcher) => {
    setSelectedSnakeCatcher(snakeCatcher);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedSnakeCatcher(null);
    setOpen(false);
  };

  return (
    <div>
    <TemporaryDrawer/>
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
                <TableCell>Street Name</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {snakeCatchers.map((snakeCatcher) => (
                <TableRow key={snakeCatcher.snakeCatcherId}>
                  <TableCell>{snakeCatcher.salutation} {snakeCatcher.firstName} {snakeCatcher.lastName}</TableCell>
                  <TableCell>{snakeCatcher.contactNo}</TableCell>
                  <TableCell>{snakeCatcher.street}</TableCell>
                  <TableCell>{snakeCatcher.city}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleView(snakeCatcher)}>View</Button>
                  </TableCell>
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
      {selectedSnakeCatcher && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Snake Catcher Details</DialogTitle>
          <DialogContent>
            <Typography>Name: {selectedSnakeCatcher.salutation} {selectedSnakeCatcher.firstName} {selectedSnakeCatcher.lastName}</Typography>
            <Typography>Contact Number: {selectedSnakeCatcher.contactNo}</Typography>
            <Typography>Street Name: {selectedSnakeCatcher.street}</Typography>
            <Typography>City: {selectedSnakeCatcher.city}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default SearchSnakeCatcher;

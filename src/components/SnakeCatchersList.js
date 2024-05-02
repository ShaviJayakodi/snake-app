import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import MainCard from '../ui-component/cards/MainCard';
import SnakeCatcherDetailsPopup from './SnakeCatcherDetailsPopup';
import axios from 'axios';
import Swal from 'sweetalert2';

function SnakeCatchersList() {
  const [snakeCatchers, setSnakeCatchers] = useState([]);
  const [selectedSnakeCatcher, setSelectedSnakeCatcher] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8080/snakeCatcher/getAllSnakeCatchers')
      .then(function (response) {
        if(response.data.payload.length>0){
             setSnakeCatchers(response.data.payload);
        } else {
            Swal.fire({
                icon: "error",
                title: "Snake Catchers Not Found!",
              });
        }
       
      })
      .catch(function (error) {
        Swal.fire({
            icon: "error",
            title: error.response.data.details,
          });
      });
  }, []);

  const handleView = (snakeCatcher) => {
    setSelectedSnakeCatcher(snakeCatcher);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedSnakeCatcher(null);
    setOpen(false);
  };

  return (
    <MainCard>
     <Typography variant="h4" align="center" gutterBottom>
        Snake Catcher List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Reg No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Contact No</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {snakeCatchers.map((snakeCatcher) => (
              <TableRow key={snakeCatcher.snakeCatcherId}>
                <TableCell>{snakeCatcher.regNo}</TableCell>
                <TableCell>{snakeCatcher.salutation} {snakeCatcher.firstName} {snakeCatcher.lastName}</TableCell>
                <TableCell>{snakeCatcher.email}</TableCell>
                <TableCell>{snakeCatcher.city}</TableCell>
                <TableCell>{snakeCatcher.contactNo}</TableCell>
                <TableCell>
                  <Button onClick={() => handleView(snakeCatcher)}>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedSnakeCatcher && (
        <SnakeCatcherDetailsPopup
          open={open}
          handleClose={handleClose}
          snakeCatcher={selectedSnakeCatcher}
          setSnakeCatchers={setSnakeCatchers} 
        />
      )}
    </MainCard>
  );
}

export default SnakeCatchersList;

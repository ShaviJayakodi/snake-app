import { Button, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import MainCard from '../ui-component/cards/MainCard';
import TemporaryDrawer from './TemporaryDrawer';

const PendingApprovals = () => {
  const [requests, setRequests] = useState([]); // Use an array to store the fetched requests
  useEffect(() => {
    // Fetch data when the component mounts
    axios
      .get('http://localhost:8080/snakeCatcher/getPendingApprovals')
      .then((response) => {
        const responseData = response.data.payload;
        if (responseData) {
          setRequests(responseData); // Store the fetched data in the 'requests' state
        } else {
          Swal.fire({
            icon: 'error',
            title: 'No Pending Requests!'
          });
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          Swal.fire({
            icon: 'error',
            title: 'No Pending Requests!'
          });
        } else {
          console.error(error);
        }
      });
  }, []);


  const handleAccept = (snakeCatcherId, status) => {
    console.log(snakeCatcherId, status);
    // Send an API request to accept the request with the given ID
    axios
      .put('http://localhost:8080/snakeCatcher/approve', null, {
        params: {
          snakeCatcherId: snakeCatcherId,
          status: status
        }
      })
      .then((response) => {
        if (response.data.messages && response.data.messages[0] === 'Approved!') {
          Swal.fire('Done!', 'Request Accepted!', 'success');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'ERROR!',
            text: response.data.statusList.toString()
          });
        }
        // Remove the accepted request from the state (optional)
        setRequests((prevRequests) => prevRequests.filter((request) => request.snakeCatcherId !== snakeCatcherId));
      })
      .catch((error) => {
        console.error(`Error accepting request with ID ${snakeCatcherId}:`, error);
      });
};


const handleReject = (snakeCatcherId, status) => {
  // Send an API request to reject the request with the given ID
  axios
    .put('http://localhost:8080/snakeCatcher/approve', null, {
      params: {
        snakeCatcherId: snakeCatcherId,
        status: status
      }
    })
    .then((response) => {
      if (response.data.messages && response.data.messages[0] === 'Rejected!') {
        Swal.fire('Done!', 'Request Rejected!', 'success');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'ERROR!',
          text: response.data.statusList.toString()
        });
      }
      setRequests((prevRequests) => prevRequests.filter((request) => request.snakeCatcherId !== snakeCatcherId));
    })
    .catch((error) => {
      console.error(`Error rejecting request with ID ${snakeCatcherId}:`, error);
    });
};


  return (
    <div>
      <TemporaryDrawer/>
    <Grid container spacing={2}>
      {requests.map((request) => (
        <Grid item key={request.snakeCatcherId} xs={12} sm={12} md={12}>
          <MainCard title={ request.salutation + ' ' + request.firstName + ' ' + request.lastName}>
            <Typography variant="body2">{request.street + ',' + request.city}</Typography>
            <Typography variant="body2">{request.email}</Typography>
            <Typography variant="body2">{request.contactNo}</Typography>
            <Grid container spacing={2} justifyContent="flex-end" mt={2}>
              <Grid item>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleAccept(request.snakeCatcherId,1)} // Pass the request ID to the handleAccept function
                >
                  Accept
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleReject(request.snakeCatcherId,0)} // Pass the request ID to the handleReject function
                >
                  Reject
                </Button>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      ))}
    </Grid>
    
    </div>
  );
};
export default PendingApprovals;

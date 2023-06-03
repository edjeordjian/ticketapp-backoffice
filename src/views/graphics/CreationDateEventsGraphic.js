import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      label: 'Creación de eventos a lo largo del tiempo',
      data: [1,2,4,5,7,8,9],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(58, 87, 232)',
    },
  ],
};

export default function CreationDateEventsGraphic(props) {
    return (
        <Box style={styles().container}>
            <Box style={{height: '300px', width:'70%'}}>
                <Typography>
                  Creación de eventos
                </Typography>
                <Line data={data}/>
            </Box>
        </Box>
    );
}

const styles = () => {
    return {
        container: {
            height: '600px', 
            width:'100%',
            backgroundColor: 'white', 
            padding: '15px', 
            borderRadius: '15px',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center'
        }
    }
}
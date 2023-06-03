import React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = ['A', 'B', 'C', 'D', 'E'];


export const data = {
  labels,
  datasets: [
    {
      label: 'Organizadores con más denuncias',
      data: [1,2,4,5,9],
      backgroundColor: 'rgba(58, 87, 232)',
    },
  ],
};

export default function TopReportsBarGraphic(props) {
    return (
        <Box style={styles().container}>
            <Box style={{height: '300px', width:'600px'}}>
                <Typography component="h2" color="#111827" style={styles().title}>
                  Top 5 denuncias
                </Typography>
                <Bar data={data}/>
            </Box>
        </Box>
    );
}

const styles = () => {
    return {
        container: {
            height: '400px', 
            width:'800px', 
            backgroundColor: 'white', 
            padding: '15px', 
            borderRadius: '15px',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '45px'
        },
        title: {
          marginTop: '25px',
          marginBottom: '25px',
          fontWeight: '900'
        }
    }
}
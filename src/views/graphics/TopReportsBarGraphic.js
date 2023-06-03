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
            <Box style={{height: '400px', width:'800px'}}>
                <Typography>
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
            height: '500px', 
            width:'1000px', 
            backgroundColor: 'white', 
            padding: '15px', 
            borderRadius: '15px',
            display: 'flex',
            justifyContent: 'center'
        }
    }
}
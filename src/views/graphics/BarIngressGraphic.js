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


export default function BarIngressGraphic(props) {
    const labels = props.labels;

    const data = {
      labels,
      datasets: [
        {
          label: 'Ingresos a los largo del tiempo',
          data: props.data,
          backgroundColor: 'rgba(58, 87, 232)',
        },
      ],
    };
    
    return (
        <Box style={styles().container}>
            <Box style={{height: '400px', width:'800px'}}>
                <Typography component="h2" color="#111827" style={styles().title}>
                  Ingresos a eventos
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
        },
        title: {
          marginTop: '25px',
          marginBottom: '25px',
          fontWeight: '900'
        }
    }
}
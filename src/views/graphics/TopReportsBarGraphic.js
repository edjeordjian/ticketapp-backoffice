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


export default function TopReportsBarGraphic(props) {
    if (! props.stats) {
        return <></>;
    }

    const data = {
        labels: props.stats.labels,
        datasets: [
            {
                label: 'Organizadores con más denuncias',
                data: props.stats.data,
                backgroundColor: 'rgba(58, 87, 232)',
            },
        ],
    };

    return (
        <Box style={styles().container}>
            <Box style={{height: '300px', width:'600px'}}>
                <Typography component="h2" color="#111827" style={styles().title}>
                  Organizadores con más denuncias
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
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Borrador', 'Publicado', 'Cancelado', 'Suspendido','Finalizado'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 1],
      backgroundColor: [
        'rgba(58, 87, 232)',
        'rgba(133, 244, 250)',
        'rgba(199, 255, 108)',
        'rgba(252, 103, 255)',
        'rgba(252, 103, 55)'
      ]
    },
  ],
};

export default function EventStatesGraphic(props) {
    return (
        <Box style={styles().container}>
            <Box style={{height: '400px', width:'400px'}}>
                <Typography component="h2" color="#111827" style={styles().title}>
                    Estado de eventos
                </Typography>
                <Doughnut 
                    options={{ maintainAspectRatio: false }}
                    data={data}
                />
            </Box>
        </Box>
    );
}

const styles = () => {
    return {
        container: {
            height: '500px', 
            width:'500px', 
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
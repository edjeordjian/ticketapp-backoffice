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


export default function LineGraphic(props) {
  const labels = props.labels;
  const data = {
      labels,
      datasets: [
        {
          label: props.subtitle,
          data: props.data,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(58, 87, 232)',
        },
      ],
    };
    
    return (
        <Box style={styles().container}>
            <Box style={{height: '300px', width:'70%'}}>
                <Typography component="h2" color="#111827" style={styles().title}>
                  {props.title}
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
        },
        title: {
          marginTop: '25px',
          marginBottom: '25px',
          fontWeight: '900'
        }
    }
}
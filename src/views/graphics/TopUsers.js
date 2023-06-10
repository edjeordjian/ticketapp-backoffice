import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";

export default function TopUsers(props) {
    const _renderOrganizerTitle = (o) => {
        return(
            <Box sx={styles().personContainer}>
                <Typography component="h5" color="#111827">Nombre
                </Typography>

                <Typography component="h5" color="#111827">Entradas
                </Typography>

                <Typography component="h5" color="#111827">% ingresos
                </Typography>
            </Box>
        )
    }

    const _renderOrganizer = (organizer) => {
        return(
            <Box sx={styles().personContainer}>
                <Typography component="h5"
                            color="#111827">{organizer.organizer}
                </Typography>

                <Typography component="h5"
                            color="#111827">{organizer.tickets}
                </Typography>

                <Typography component="h5"
                            color="#111827">{organizer.percentage}
                </Typography>
            </Box>
        )
    }

    return (
        <Box sx={styles().container}>
            <Typography component="h2" color="#111827" style={styles().title}>
                Top Organizadores
            </Typography>
            <Box sx={styles().containerOrg}>
                {_renderOrganizerTitle()}

                {
                    (props.organizers) && (
                        props.organizers.map(organizer => _renderOrganizer(organizer))
                    )
                }
            </Box>
        </Box>
    )
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
            justifyContent: 'flex-start',
            alignContent: 'center',
            flexDirection: 'column'
        },
        title: {
          marginTop: '25px',
          marginBottom: '25px',
          fontWeight: '900'
        },
        personContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignContent:  'center',
            backgroundColor: '#f0f0f0',
            marginBottom: '10px',
            borderRadius: '5px',
            padding: '5px 10px'
        },
        containerOrg: {
            display: 'flex',
            width: '800px',
            justifyContent: 'center',
            alignContent:  'center',
            flexDirection: 'column'
        }
    }
}
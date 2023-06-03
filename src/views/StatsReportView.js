import {
  Button, CircularProgress, Table, TableBody, TableCell,
  TableRow
} from "@mui/material";
import {getTo} from "../services/helpers/RequestHelper";
import { Box, height } from "@mui/system";
import * as React from "react";
import {Link, useNavigate} from "react-router-dom";
import * as SweetAlert2 from "sweetalert2";
import { useMainContext } from "../services/contexts/MainContext";
import {dataGridTheme, textTheme} from "../styles/events/ReportsListStyle";

// Icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';

import {
  START_DATE_PARAM,
  END_DATE_PARAM,
  EVENT_SEARCH_NAME_URL,
  ADMIN_PARAM,
  GET_REPORTS_PARAM, BACKEND_HOST
} from "../constants/URLs";


import { ThemeProvider } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import BasicDatePicker from "../components/BasicDatePicker";
import EventStatesGraphic from "./graphics/EventStatesGraphic";
import CreationDateEventsGraphic from "./graphics/CreationDateEventsGraphic";
import BarIngressGraphic from "./graphics/BarIngressGraphic";
import TopReportsBarGraphic from "./graphics/TopReportsBarGraphic";

export default function StatsReportView(props) {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);

  const {getUserId, getUserToken} = useMainContext();
  const [userToken, setUserToken] = React.useState(getUserToken());

  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  const [updateTab, setUpdateTab] = React.useState(false);

  React.useEffect(() => {
    document.body.style.backgroundColor = '#f9f6f4';

    getServicesWrapper(false).then(r => r);
  }, [updateTab]);

  const getServicesWrapper = async (useFilters) => {
    //const events = await getEvents(useFilters);

    //setEvents(events);

   // setRows(events);

    //setFilteredRows(events);
  };


  async function getEvents(useFilters) {
    let url = `${BACKEND_HOST}${EVENT_SEARCH_NAME_URL}`;

    url += `?${ADMIN_PARAM}=true&${GET_REPORTS_PARAM}=true`;

    if (useFilters) {
      url += `&${START_DATE_PARAM}=${startDate}&${END_DATE_PARAM}=${endDate}`;
    }
    let response = a
    return response.events;
  }

  const boxStat = (label, amount, iconName) => {
    let icon = undefined;
    if (iconName === 'user'){
      icon = <AccountCircleIcon style={{fontSize: 80, color:"#001AFF"}}/>
    } else if (iconName === 'event') {
      icon = <ConfirmationNumberIcon style={{fontSize: 80, color:"#001AFF"}}/>
    } else {
      icon = <FlagCircleIcon style={{fontSize: 80, color:"#001AFF"}}/>
    }
    return (
      <Box sx={styles().boxStatContainer}>
        {icon}
        <Box>
          <Typography component="h3" color="#8A92A6">
            {label}
          </Typography>
          <Typography component="h5" color="#232D42" fontWeight={600}>
            {amount}
          </Typography>
        </Box>
      </Box>
    )
  }

  const filterBox = () => {
    return (
      <Box sx={{display:'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
        <Typography component="h1" fontWeight="700">
          Filtros por fecha
        </Typography>
        <Box sx={{display:'flex', justifyContent: 'flex-end', gap: '10px'}}>
          <BasicDatePicker label="Fecha Desde" setSelectedDate={() => console.log('asdf')} />
          <BasicDatePicker label="Fecha Hasta" setSelectedDate={() => console.log('asdf')} />
        </Box>
      </Box>
    )
  }

  const body = () => {
    return (
      <Box style={{
        position: 'absolute',
        marginLeft: '280px',
        width: '80%'
      }}>
       <Box sx={styles().boxStatsContainer}>
          {boxStat('Eventos creados', 30000, 'event')}
          {boxStat('Usuarios activos', 200, 'user')}
          {boxStat('Denuncias', 3400, 'report')}
       </Box>
       <Box sx={styles().row}>
         {filterBox()}
       </Box>
       <Box sx={styles().row}>
        <BarIngressGraphic/>
        <EventStatesGraphic/>
       </Box>
       <Box sx={styles().row}>
        <CreationDateEventsGraphic/>
       </Box>
       <Box sx={styles().row}>
        <TopReportsBarGraphic/>
       </Box>
      </Box>
    )
  }

  const loadProgress = () => {
    return (
      <Box sx={styles().loadingContainer}>
        <Box sx={styles().loadingBox}>
          <CircularProgress />
          <Typography>Un momento mientras obtenemos los resultados</Typography>
        </Box>
      </Box>
    )
  }


  return (
      <div>
        <ThemeProvider theme={textTheme}>
          {loading ? loadProgress() : body()}
        </ThemeProvider>
      </div>
  );
}


const styles = () => {
  return {
    boxStatsContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-around',
      marginTop: '25px',
      padding: '25px'
    },
    boxStatContainer: {
      backgroundColor: 'white',
      justifyContent: 'center',
      alignContent: 'center',
      gap: '35px',
      borderRadius: '15px',
      padding: '30px 50px',
      display: 'flex',
      width: '280px',
    },
    row: {
      display: 'flex',
      marginTop: '25px',
      gap: '20px'
    },
    loadingBox: {
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px'
    },
    loadingContainer: {
      display: 'flex',
      position: 'absolute',
      marginLeft: '240px',
      width: '80%',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      height: '100vh'
    },

  }
}
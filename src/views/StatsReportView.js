import {CircularProgress} from "@mui/material";
import {getTo} from "../services/helpers/RequestHelper";
import { Box } from "@mui/system";
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
    EVENT_STATS_EVENTS_STATES, BACKEND_HOST, EVENT_URL, EVENT_ID_PARAM, GET_REPORTS_PARAM, TOP_ORGANIZERS_URL
} from "../constants/URLs";


import { ThemeProvider } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import BasicDatePicker from "../components/BasicDatePicker";
import EventStatesGraphic from "./graphics/EventStatesGraphic";
import LineGraphic from "./graphics/LineGraphic";
import BarIngressGraphic from "./graphics/BarIngressGraphic";
import TopReportsBarGraphic from "./graphics/TopReportsBarGraphic";
import TopUsers from "./graphics/TopUsers";
import {GET_EVENT_ERROR} from "../constants/EventConstants";

export default function StatsReportView(props) {

  const [loading, setLoading] = React.useState(false);

  const {getUserId, getUserToken} = useMainContext();
  const [userToken, setUserToken] = React.useState(getUserToken());

  // Fitros
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  // Stats
  const [eventsStateData, setEventsStateData] =  React.useState({labels:[], data:[]});
  const [historicData, setHistoricData] =  React.useState({users:0, events:0, reports:0});

  const [topOrganizers, setTopOrganizers] = React.useState([]);

  React.useEffect(() => {
    document.body.style.backgroundColor = '#f9f6f4';

    getStats().then();
  }, []);

  const getStats = async () => {
    setLoading(true);
    // obtener token
    //const eventStatesData = await getEventStatesData();
    //const getHistoricData = await getEventStatesData();

    await getTopOrganizers();

    setLoading(false);
  };

  async function getEventStatesData() {
    let url = `${BACKEND_HOST}${EVENT_STATS_EVENTS_STATES}`;
    url += `?${START_DATE_PARAM}=${startDate}&${END_DATE_PARAM}=${endDate}`;
    let response = await getTo(url, userToken);
    const stats = response.stats;
    const labels = stats.map(e => {return e.status});
    const data = stats.map(e => {return e.number});
    setEventsStateData({labels, data});
  }

  async function getHistoricData() {
    let url = `${BACKEND_HOST}${EVENT_STATS_EVENTS_STATES}`;
    let response = await getTo(url, userToken);
    const stats = response.stats;
    setHistoricData({users:stats.users, events:stats.events, reports:stats.reports})
  }

  const getTopOrganizers = async  () => {
      await getTo(`${BACKEND_HOST}${TOP_ORGANIZERS_URL}`,
          userToken)
          .then(response => {
              if (response.error) {
                  SweetAlert2.fire({
                      title: response.error,
                      icon: "error"
                  }).then();

                  return;
              }

              setTopOrganizers(response.organizers);
          });
  }

  const updateFromDate = async (date) => {
    console.log(date);
    await setStartDate(date);
    getStats();
  }

  const updateToDate = async (date) => {
    console.log(date);
    await setEndDate(date);
    getStats();
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
        <Typography component="h1" fontWeight="700" fontSize="26px">
          Filtros por fecha
        </Typography>
        <Box sx={{display:'flex', justifyContent: 'flex-end', gap: '10px'}}>
          <BasicDatePicker label="Fecha Desde" setSelectedDate={updateFromDate} />
          <BasicDatePicker label="Fecha Hasta" setSelectedDate={updateToDate} />
        </Box>
      </Box>
    )
  }

  const body = () => {
    return (
      <Box style={{
        position: 'absolute',
        marginLeft: '280px',
        backgroundColor: '#f9f6f4',
        width: '80%'
      }}>
       <Box sx={styles().boxStatsContainer}>
          {boxStat('Eventos creados', historicData.events, 'event')}
          {boxStat('Usuarios activos', historicData.users, 'user')}
          {boxStat('Denuncias', historicData.reports, 'report')}
       </Box>
       <Box sx={styles().row}>
         {filterBox()}
       </Box>
       <Box sx={styles().row}>
        <BarIngressGraphic 
          data={[1,2,4,5,7,8,9]}
          labels={['January', 'February', 'March', 'April', 'May', 'June', 'July']}
        />
        <EventStatesGraphic data={eventsStateData.data} labels={eventsStateData.labels}/>
       </Box>
       <Box sx={styles().row}>
        <LineGraphic 
          title={"Creación de eventos"} 
          subtitle={"Creación de eventos a lo largo del tiempo"}
          labels={['January', 'February', 'March', 'April', 'May', 'June', 'July']}
          data={[1,2,4,5,7,8,9]}
          />
       </Box>
       <Box sx={styles().row}>
        <LineGraphic 
          title={"Denuncias realizadas"}
          subtitle={"Denuncia de eventos a lo largo del tiempo"}
          labels={['January', 'February', 'March', 'April', 'May', 'June', 'July']}
          data={[1,2,4,5,7,8,9]}
          />
       </Box>
       <Box sx={styles().row}>
        <TopReportsBarGraphic/>
        <TopUsers organizers={topOrganizers}/>
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
      justifyContent: 'space-between',
      marginTop: '35px',
      marginBotton: '35px'
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
import {
    Button,
    CircularProgress,
    Select
} from "@mui/material";

import {getTo} from "../services/helpers/RequestHelper";

import { Box } from "@mui/system";

import * as React from "react";

import * as SweetAlert2 from "sweetalert2";

import { useMainContext } from "../services/contexts/MainContext";

import {textTheme} from "../styles/events/ReportsListStyle";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

import FlagCircleIcon from '@mui/icons-material/FlagCircle';

import {
    START_DATE_PARAM,
    END_DATE_PARAM,
    HISTORIC_STATS_URL,
    BACKEND_HOST,
    TOP_ORGANIZERS_URL,
    REPORTS_STATS_URL,
    FILTER_PARAM,
    EVENTS_DATES_STATS_URL,
    EVENT_STATUS_STATS_URL,
    ATTENDANCES_TOTAL_STATS_URL,
    TOP_REPORTED_ORGANIZRS_URL
} from "../constants/URLs";


import { ThemeProvider } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import BasicDatePicker from "../components/BasicDatePicker";
import EventStatesGraphic from "./graphics/EventStatesGraphic";
import LineGraphic from "./graphics/LineGraphic";
import BarIngressGraphic from "./graphics/BarIngressGraphic";
import TopReportsBarGraphic from "./graphics/TopReportsBarGraphic";
import TopUsers from "./graphics/TopUsers";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import MenuItem from "@mui/material/MenuItem";

import moment from "moment";

export default function StatsReportView(props) {

  const [loading, setLoading] = React.useState(false);

  const {getUserId, getUserToken} = useMainContext();

  const [userToken, setUserToken] = React.useState(getUserToken());

  const DEFAULT_START_DATE = 'Thu Jun 07 2023 10:19:31 GMT-0300 (Argentina Standard Time)';

  const DEFAULT_FILTER = "day";

  // Fitros
  const [startDate, setStartDate] = React.useState(new Date(DEFAULT_START_DATE));

  const [endDate, setEndDate] = React.useState(new Date());

  const [filterKind, setFilterKind] = React.useState(DEFAULT_FILTER);

  // Stats
  const [eventsStateData, setEventsStateData] = React.useState({labels:[], data:[]});

  const [eventDatesStats, setEventDateStats] = React.useState({labels:[], data:[]});

  const [historicData, setHistoricData] = React.useState({users:0, events:0, reports:0});

  const [topOrganizers, setTopOrganizers] = React.useState([]);

  const [topReportedOrganizers, setTopReportedOrganizers] = React.useState({labels:[], data:[]});

  const [reportsStats, setReportsStats] = React.useState({labels:[], data:[]});

  const [attendancesData, setAttendancesData] = React.useState([]);

  React.useEffect(() => {
    document.body.style.backgroundColor = '#f9f6f4';

    getStats().then();
  }, []);

  const getStats = async () => {
    setLoading(true);

    await getHistoricData();

    await getReportsStats(startDate, endDate);

    await getTopOrganizers();

    await getEventDatesStats();

    await getEventStatusDateStats();

    await getAttendancesData();

    await getTopReportedOrganizers();

    setLoading(false);
  };

  const getFormattedDate = (dDate) => {
      return dDate !== null
          ? moment(dDate).format("YYYY-MM-DD") : "";
  }

  const getAttendancesData = async () => {
      const formattedStartDate = startDate !== null
          ? moment(startDate).format("YYYY-MM-DD")
          : "";

      const formattedEndDate = endDate !== null
          ? moment(endDate).format("YYYY-MM-DD")
          : "";

      await getTo(`${BACKEND_HOST}${ATTENDANCES_TOTAL_STATS_URL}`
          + `?${START_DATE_PARAM}=${formattedStartDate}`
          + `&${END_DATE_PARAM}=${formattedEndDate}`
          + `&${FILTER_PARAM}=${filterKind}`,
          userToken)
          .then(response => {
              if (response.error) {
                  SweetAlert2.fire({
                      title: response.error,
                      icon: "error"
                  }).then();

                  return;
              }

              setAttendancesData(response);
          });
  }

  const getHistoricData = async function getHistoricData() {
      const formattedStartDate = startDate !== null
          ? moment(startDate).format("YYYY-MM-DD")
          : "";

      const formattedEndDate = endDate !== null
          ? moment(endDate).format("YYYY-MM-DD")
          : "";

      await getTo(`${BACKEND_HOST}${HISTORIC_STATS_URL}`
          + `?${START_DATE_PARAM}=${formattedStartDate}`
          + `&${END_DATE_PARAM}=${formattedEndDate}`,
          userToken)
          .then(response => {
              if (response.error) {
                  SweetAlert2.fire({
                      title: response.error,
                      icon: "error"
                  }).then();

                  return;
              }

              setHistoricData( {
                  users: response.userCount,
                  events: response.eventCount,
                  reports: response.reportCount
              } );
          });
  }

  const getEventStatusDateStats = async () => {
      const formattedStartDate = startDate !== null
          ? moment(startDate).format("YYYY-MM-DD")
          : "";

      const formattedEndDate = endDate !== null
          ? moment(endDate).format("YYYY-MM-DD")
          : "";

      await getTo(`${BACKEND_HOST}${EVENT_STATUS_STATS_URL}`
          + `?${START_DATE_PARAM}=${formattedStartDate}`
          + `&${END_DATE_PARAM}=${formattedEndDate}`,
          userToken)
          .then(response => {
              if (response.error) {
                  SweetAlert2.fire({
                      title: response.error,
                      icon: "error"
                  }).then();

                  return;
              }

              setEventsStateData(response);
          });
  }

  const getEventDatesStats = async () => {
      const formattedStartDate = startDate !== null ? moment(startDate).format("YYYY-MM-DD") : "";

      const formattedEndDate = endDate !== null ? moment(endDate).format("YYYY-MM-DD") : "";

      await getTo(`${BACKEND_HOST}${EVENTS_DATES_STATS_URL}`
          + `?${START_DATE_PARAM}=${formattedStartDate}`
          + `&${END_DATE_PARAM}=${formattedEndDate}`
          + `&${FILTER_PARAM}=${filterKind}`,
          userToken)
          .then(response => {
              if (response.error) {
                  SweetAlert2.fire({
                      title: response.error,
                      icon: "error"
                  }).then();

                  return;
              }

              setEventDateStats(response);
          });
  }

  const getReportsStats = async  (startDate, endDate) => {
      const formattedStartDate = startDate !== null ? moment(startDate).format("YYYY-MM-DD") : "";

      const formattedEndDate = endDate !== null ? moment(endDate).format("YYYY-MM-DD") : "";

        await getTo(`${BACKEND_HOST}${REPORTS_STATS_URL}`
            + `?${START_DATE_PARAM}=${formattedStartDate}`
            + `&${END_DATE_PARAM}=${formattedEndDate}`
            + `&${FILTER_PARAM}=${filterKind}`,
            userToken)
            .then(response => {
                if (response.error) {
                    SweetAlert2.fire({
                        title: response.error,
                        icon: "error"
                    }).then();

                    return;
                }

                setReportsStats(response);
            });
    }

  const getTopOrganizers = async  () => {
      await getTo(`${BACKEND_HOST}${TOP_ORGANIZERS_URL}`
          + `?${START_DATE_PARAM}=${getFormattedDate(startDate)}`
          + `&${END_DATE_PARAM}=${getFormattedDate(endDate)}`,
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

  const getTopReportedOrganizers = async  () => {
      await getTo(`${BACKEND_HOST}${TOP_REPORTED_ORGANIZRS_URL}`
          + `?${START_DATE_PARAM}=${getFormattedDate(startDate)}`
          + `&${END_DATE_PARAM}=${getFormattedDate(endDate)}`,
            userToken)
            .then(response => {
                if (response.error) {
                    SweetAlert2.fire({
                        title: response.error,
                        icon: "error"
                    }).then();

                    return;
                }

                setTopReportedOrganizers(response);
            });
    }

  const updateFromDate = async (date) => {
    console.log(date);
    
    setStartDate(date);
  }

  const updateToDate = async (date) => {
    console.log(date);

    await setEndDate(date);
  }

  const handleChangeFilterKind = (event) => {
      setFilterKind(event.target.value);
  }

  const handleUseFilters = () => {
      getStats().then();
  }

  const handleDisableFilters = () => {

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
      <Box sx={{display:'flex', 
                marginTop: '10px',
                justifyContent: 'space-between', 
                alignItems: 'center', width: '100%'}}>
        <Typography component="h1" fontWeight="700" fontSize="26px">
          Filtros
        </Typography>
        <Box sx={{display:'flex', gap: '10px'}}>
            <Select value={filterKind}
                sx={{width: '150px'}}
                onChange={handleChangeFilterKind}>
                <MenuItem value={"day"}>Día</MenuItem>
                <MenuItem value={"month"}>Mes</MenuItem>
                <MenuItem value={"year"}>Año</MenuItem>
            </Select>
            <BasicDatePicker label="Fecha Desde"
                            setSelectedDate={updateFromDate}
                            oldDate={startDate}/>

            <BasicDatePicker label="Fecha Hasta"
                            setSelectedDate={updateToDate}
                            oldDate={endDate}/>
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
          {boxStat('Eventos activos', historicData.events, 'event')}
          {boxStat('Usuarios activos', historicData.users, 'user')}
          {boxStat('Denuncias', historicData.reports, 'report')}
       </Box>

        <Box sx={styles().row}>
          {filterBox()}
        </Box>

        <Box sx={styles().row}>
          <Box sx={{display:'flex', gap: '10px', width:'100%', justifyContent:'flex-end'}}>
              <Box onClick={() => handleUseFilters()}>
                  <Button  variant="outlined" endIcon={<FilterAltIcon/>}>Filtrar</Button>
              </Box>
              <Box  onClick={() => handleDisableFilters()}>
                  <Button variant="outlined" endIcon={<FilterAltOffIcon/>}>Quitar filtro</Button>
              </Box>
          </Box>
       </Box>

       <Box sx={styles().row}>
        <BarIngressGraphic 
          data={attendancesData.data}
          labels={attendancesData.labels}
        />
        <EventStatesGraphic data={eventsStateData.data} labels={eventsStateData.labels}/>
       </Box>

       <Box sx={styles().row}>
        <LineGraphic 
          title={"Creación de eventos"} 
          subtitle={"Creación de eventos a lo largo del tiempo"}
          labels={eventDatesStats.labels}
          data={eventDatesStats.data}
          />
       </Box>

       <Box sx={styles().row}>
        <LineGraphic 
          title={"Denuncias realizadas"}
          subtitle={"Denuncia de eventos a lo largo del tiempo"}
          labels={reportsStats.labels}
          data={reportsStats.data}
          />
       </Box>
       <Box sx={styles().row}>
        <TopReportsBarGraphic stats={topReportedOrganizers}/>
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
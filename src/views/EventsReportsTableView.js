import {
  Button, Table, TableBody, TableCell,
  TableRow
} from "@mui/material";
import {getTo, patchTo, postTo} from "../services/helpers/RequestHelper";
import { Box } from "@mui/system";
import * as React from "react";
import {Link, useNavigate} from "react-router-dom";
import * as SweetAlert2 from "sweetalert2";
import { useMainContext } from "../services/contexts/MainContext";
import { BlankLine } from "../components/BlankLine";
import {dataGridTheme, eventListViewStyles, textTheme} from "../styles/events/ReportsListStyle";

import {AdminSwitch} from "../components/events/AdminSwitch";

import {matrixStyles} from "../styles/events/matrixStyles";

import {
  USER_BLOCK_URL,
  START_DATE_PARAM,
  END_DATE_PARAM,
  EVENT_SEARCH_NAME_URL,
  ADMIN_PARAM,
  GET_REPORTS_PARAM,
  EVENT_REPORTS_LIST_PATH,
  EVENT_VIEW_PATH,
  EVENT_ID_PARAM,
  EVENT_CANCEL_URL,
  EVENT_SUSPEND_URL
} from "../constants/URLs";


import { ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import Typography from "@mui/material/Typography";
import BasicDatePicker from "../components/BasicDatePicker";

export default function EventsReportsTableView(props) {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(true);

  const { getUserId, getUserToken } = useMainContext();

  const [events, setEvents] = React.useState([]);

  const [userToken, setUserToken] = React.useState(getUserToken());

  const {logOut} = useMainContext();

  const [rows, setRows] = React.useState([]);

  const [filteredRows, setFilteredRows] = React.useState([]);

  const [startDate, setStartDate] = React.useState("");

  const [endDate, setEndDate] = React.useState("");

  const classes = matrixStyles();

  const [updateTab, setUpdateTab] = React.useState(false);

  const [sortModel, setSortModel] = React.useState([
    {
      field: 'reportsNumber',
      sort: 'desc',
    },
  ]);

  React.useEffect(() => {
    document.body.style.backgroundColor = '#f9f6f4';

    getServicesWrapper(false).then(r => r);
  }, [updateTab]);

  const getServicesWrapper = async (useFilters) => {
    const events = await getEvents(useFilters);

    setEvents(events);

    setRows(events);

    setFilteredRows(events);
  };

  const handleUseFilter = async () => {
      await getServicesWrapper(true);
  }

  const handleDisableFilter = async () => {
      await getServicesWrapper(false);
  }

  const handleStartDateChange = (value) => {
    setStartDate(value);
  }

  const handleEndDateChange = (value) => {
    setEndDate(value);
  }

  async function handleSuspend(event) {
    const url = `${process.env.REACT_APP_BACKEND_HOST}${EVENT_SUSPEND_URL}`;

    const requestBody = {
      eventId: event.id,
      suspend: !event.isBlocked
    }

    const response = await patchTo(url, requestBody, userToken);

    if (response.error) {
      SweetAlert2.fire({
        icon: "error",
        title: response.error,
        confirmButtonText: "Aceptar"
      }).then(r => {
        if (response.error
            .toLowerCase()
            .includes("token")) {
          logOut().then(navigate("/"));
        }
      });
    } else {
      SweetAlert2.fire({
        icon: "info",
        title: response.message,
        confirmButtonText: "Aceptar"
      }).then(_ => setUpdateTab(! updateTab));
    }
  }

  const renderActions = (params) => {
    const e = params.row;

    return (
        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Button onClick={async () => {
                    navigate(`${EVENT_VIEW_PATH}?${EVENT_ID_PARAM}=${e.id}`, {
                      state: {
                        event: e
                      }
                    })
                  }}> Ver denuncias
          </Button>

          <Button onClick={async () => {
                    await handleSuspend(e)
                  }}>
            {
              (e.isBlocked) ? "Activar evento" : "Suspender evento"
            }
          </Button>
        </div>
    );
  }

  const renderName = (params) => {
    const e = params.row;

    return (
    <Button style={{textTransform: 'none'}}
            onClick={async () => {
      navigate(`${EVENT_VIEW_PATH}?${EVENT_ID_PARAM}=${e.id}`, {
        state: {
          event: e
        }
      })
    }}> {e.name}
    </Button>
    );
  }

  async function getEvents(useFilters) {
    let url = `${process.env.REACT_APP_BACKEND_HOST}${EVENT_SEARCH_NAME_URL}`;

    url += `?${ADMIN_PARAM}=true&${GET_REPORTS_PARAM}=true`;

    if (useFilters) {
      url += `&${START_DATE_PARAM}=${startDate}&${END_DATE_PARAM}=${endDate}`;
    }

    let response = await getTo(url, userToken);

    if (response.error) {
      SweetAlert2.fire({
        icon: "error",
        title: response.error,
        confirmButtonText: "Aceptar"
      }).then(r => {
        if (response.error
            .toLowerCase()
            .includes("token")) {
          logOut().then(navigate("/"));
        }
      });
    }

    return response.events;
  }

  const columns = [
    {
      field: 'name',
      headerName: 'Nombre',
      headerClassName: classes.headerCell,
      renderCell: renderName,
      flex: 0.7,
      headerAlign: 'center',
      align:'center'
    },
    {
      field: 'reportsNumber',
      headerName: 'Denuncias',
      headerClassName: classes.headerCell,
      flex: 0.7,
      headerAlign: 'center',
      align:'center'
    },
    {
      field: 'lastReportDate',
      headerName: 'Última denuncia',
      headerClassName: classes.headerCell,
      flex: 0.7,
      headerAlign: 'center',
      align:'center'
    },
    {
      field: 'user actions',
      headerName: 'Acciones',
      flex: 0.7,
      headerClassName: classes.headerCell,
      renderCell: renderActions,
      headerAlign: 'center',
      align:'center'
    }
  ];

  return (
      <div>
        <BlankLine/>

        <ThemeProvider theme={textTheme}>
          <Box style={{
            width: 800,
            position: 'absolute',
            right: 850
          }}>
           <Typography variant="h4">Eventos por denuncias
           </Typography>
          </Box>
        </ThemeProvider>

        <BlankLine/>

        <div>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell style={{
                  width: 300,
                  textAlign: "right"
                }}>
                  {
                    <Box>
                      <Box style={{
                        display: "flex",
                        flexDirection: "row"
                      }}>
                        <Box flex={4}>
                        </Box>

                        <Box flex={1}>
                          <BasicDatePicker setSelectedDate={handleStartDateChange}
                                           label={"Fecha de inicio"}/>
                        </Box>

                        <Box flex={1}>
                          <BasicDatePicker setSelectedDate={handleEndDateChange}
                                            label={"Fecha de fin"}/>
                        </Box>
                      </Box>

                      <BlankLine/>

                      <Box style={{
                        display: "flex",
                        flexDirection: "row"
                      }}>
                        <Box flex={8}>
                        </Box>
                          <Box flex={1}>
                            <Box onClick={handleUseFilter}>
                              <Button>Filtrar por fecha</Button>
                            </Box>
                          </Box>

                          <Box flex={1}>
                            <Box onClick={handleDisableFilter}>
                              <Button>Quitar filtro</Button>
                            </Box>
                          </Box>
                      </Box>
                  </Box>
                  }
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        }

        <BlankLine number={2}/>

        <div style={{
          width: '87%',
          position: 'absolute',
          right: 0,
          minHeight: window.innerHeight}}>
          <ThemeProvider theme={dataGridTheme}>
          <DataGrid
              rowClick="show"
              classes={{
                headerCell: classes.headerCell,
                row: classes.row}}
              rows={filteredRows}
              rowHeight={100}
              columns={columns}
              EnableHeadersVisualStyles={false}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5
                  }
                  },
              }}
              pageSizeOptions={[5, 50, 100]}/>
          </ThemeProvider>
        </div>
      </div>
  );
}

import {
  Button, Table, TableBody, TableCell,
  TableRow, TextField
} from "@mui/material";
import { getTo, postTo } from "../services/helpers/RequestHelper";
import { Box } from "@mui/system";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import * as SweetAlert2 from "sweetalert2";
import { useMainContext } from "../services/contexts/MainContext";
import { BlankLine } from "../components/BlankLine";
import {dataGridTheme, eventListViewStyles, textTheme} from "../styles/events/ReportsListStyle";

import {AdminSwitch} from "../components/events/AdminSwitch";

import {matrixStyles} from "../styles/events/matrixStyles";

import {
  EVENTS_PATH, USER_BLOCK_URL, USER_ALL, REPORTS_PATH, USER_REPORTS, START_DATE_PARAM, END_DATE_PARAM
} from "../constants/URLs";


import { ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import Typography from "@mui/material/Typography";
import BasicDatePicker from "../components/BasicDatePicker";

export default function UserReportsTableView(props) {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(true);

  const { getUserId, getUserToken } = useMainContext();

  const [users, setUsers] = React.useState([]);

  const [userToken, setUserToken] = React.useState(getUserToken());

  const {logOut} = useMainContext();

  const [rows, setRows] = React.useState([]);

  const [filteredRows, setFilteredRows] = React.useState([]);

  const [startDate, setStartDate] = React.useState("");

  const [endDate, setEndDate] = React.useState("");

  const classes = matrixStyles();

  const [sortModel, setSortModel] = React.useState([
    {
      field: 'reportsNumber',
      sort: 'desc',
    },
  ]);

  React.useEffect(() => {
    document.body.style.backgroundColor = '#f9f6f4';

    getServicesWrapper(false).then(r => r);
  }, []);

  const getServicesWrapper = async (useFilters) => {
    const users = await getUsers(useFilters);

    setUsers(users);

    setRows(users);

    setFilteredRows(users);
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

  const renderBlockedSwitch = (params) => {
    return (
        <AdminSwitch
            itemId={params.row.id}
            initialState={params.row.isBlocked}
            executeOnChange={handleBlockedSwitch}
            input={{'aria-label': 'controlled'}}
            defaultOn={true}
        />
    );
  }

  async function handleBlockedSwitch(checked, userId) {
    const url = `${process.env.REACT_APP_BACKEND_HOST}${USER_BLOCK_URL}`;

    const requestBody = {
      userId: userId,
      block: ! checked
    }

    const response = await postTo(url, requestBody, userToken);

    if (response.error) {
      SweetAlert2.fire({
        icon: "info",
        title: response.error,
        confirmButtonText: "Aceptar"
      }).then();
    }
  }

  const renderActions = (params) => {
    const user = params.row;

    return (
        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Button onClick={async () => {
                    navigate(EVENTS_PATH, {
                      state: {
                        events: user.events
                      }
                    })
                  }}> Ver eventos
          </Button>

          <Button onClick={async () => {
                    navigate(USER_REPORTS, {
                      state: {
                        userName: user.name,
                        reports: user.reports
                      }
                    })
                  }}> Ver denuncias
          </Button>

          <Button onClick={async () => {
                    //navigate(constants.PROFILE_URL + "/" + params.row.id)
                  }}> Suspender usuario
          </Button>
        </div>
    );
  }

  async function getUsers(useFilters) {
    let url = `${process.env.REACT_APP_BACKEND_HOST}${USER_ALL}`;

    if (useFilters) {
      url += `?${START_DATE_PARAM}=${startDate}&${END_DATE_PARAM}=${endDate}`;
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

    return response.list;
  }

  const columns = [
    {
      field: 'name',
      headerName: 'Nombre',
      headerClassName: classes.headerCell,
      flex: 0.7,
      headerAlign: 'center',
      align:'center'
    },
    {
      field: 'email',
      headerName: 'Correo',
      headerClassName: classes.headerCell,
      flex: 0.85,
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
           <Typography variant="h4">Usuarios por denuncias
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
              sortModel={sortModel}
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
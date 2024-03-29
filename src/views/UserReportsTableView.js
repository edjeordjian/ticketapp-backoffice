import {
  Button, Table, TableBody, TableCell,
  TableRow, TextField
} from "@mui/material";
import {getTo, patchTo, postTo} from "../services/helpers/RequestHelper";
import { Box } from "@mui/system";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import * as SweetAlert2 from "sweetalert2";
import { useMainContext } from "../services/contexts/MainContext";
import { BlankLine } from "../components/BlankLine";
import {dataGridTheme, eventListViewStyles, textTheme} from "../styles/events/ReportsListStyle";
import VisibilityIcon from '@mui/icons-material/Visibility';
import BlockIcon from '@mui/icons-material/Block';
import {matrixStyles} from "../styles/events/matrixStyles";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

import {
  EVENTS_PATH, USER_BLOCK_URL, USER_ALL, REPORTS_PATH,
  START_DATE_PARAM, END_DATE_PARAM, USER_REPORTS_LIST_PATH, BACKEND_HOST
} from "../constants/URLs";


import { ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import Typography from "@mui/material/Typography";
import BasicDatePicker from "../components/BasicDatePicker";
import Swal from "sweetalert2";
import {confirm_suspension_constants} from "../constants/UserConstants";

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

  async function handleBlock(user) {
    const url = `${BACKEND_HOST}${USER_BLOCK_URL}`;

    const requestBody = {
      email: user.email,
      block: ! user.isBlocked
    }

    const action = (user.isBlocked)
        ? "activar al usuario"
        : "suspender al usuario";

    const confirmation = await SweetAlert2.fire({
      icon: "warning",
      title: confirm_suspension_constants(action),
      confirmButtonText: "Sí",
      cancelButtonText: 'No',
      showCancelButton: true
    });

    if (! confirmation.isConfirmed) {
      return;
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
          //logOut().then(navigate("/"));
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
    const user = params.row;

    return (
        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Button endIcon={<VisibilityIcon />} onClick={async () => {
                    navigate(USER_REPORTS_LIST_PATH, {
                      state: {
                        user: user
                      }
                    })
                  }}> Ver denuncias
          </Button>
          {(user.isBlocked) ?(
          <Button endIcon={<ChangeCircleIcon/>} onClick={() => handleBlock(user)}>
            {
              "Activar usuario"
            }
          </Button >):(
             <Button endIcon={<BlockIcon/>} onClick={() => handleBlock(user)}>
             {
               "Suspender usuario"
             }
           </Button>
          )}
        </div>
    );
  }

  async function getUsers(useFilters) {
    let url = `${BACKEND_HOST}${USER_ALL}`;

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
         // logOut().then(navigate("/"));
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
            right: 790
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
                          <Box flex={2}>
                            <Box onClick={handleUseFilter}>
                              <Button endIcon={<FilterAltIcon/>}>Filtrar por fecha</Button>
                            </Box>
                          </Box>

                          <Box flex={1}>
                            <Box  onClick={handleDisableFilter}>
                              <Button endIcon={<FilterAltOffIcon/>}>Quitar filtro</Button>
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

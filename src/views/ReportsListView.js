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
  EVENTS_PATH, USER_BLOCK_URL, USER_ALL
} from "../constants/URLs";


import { ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import Typography from "@mui/material/Typography";

export default function ReportsListView(props) {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(true);
  const [events, setEvents] = React.useState([]);
  const { getUserId, getUserToken } = useMainContext();
  const [userId, setUserId] = React.useState(getUserId());
  const [users, setUsers] = React.useState([]);

  const [userToken, setUserToken] = React.useState(getUserToken());

  const [rows, setRows] = React.useState([]);
  const [filteredRows, setFilteredRows] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const classes = matrixStyles();

  React.useEffect(() => {
    document.body.style.backgroundColor = '#f9f6f4';

    const getServicesWrapper = async () => {
      const users = await getUsers();
      setUsers(users);
      setRows(users);
      setFilteredRows(users);
    };

    getServicesWrapper().then(r => r);
  }, []);

  const [sortModel, setSortModel] = React.useState([
    {
      field: 'reportsNumber',
      sort: 'desc',
    },
  ]);

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

  const renderGetProfile = (params) => {
    const user = users[params.row.id];

    return (
        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Button
                  onClick={async () => {
                    //navigate(constants.PROFILE_URL + "/" + params.row.id)
                  }}> Ver eventos
          </Button>

          <Button
                  onClick={async () => {
                    //navigate(constants.PROFILE_URL + "/" + params.row.id)
                  }}> Ver denuncias
          </Button>

          <Button
                  onClick={async () => {
                    //navigate(constants.PROFILE_URL + "/" + params.row.id)
                  }}> Dar de baja
          </Button>
        </div>
    );
  }

  async function getUsers() {
    const url = `${process.env.REACT_APP_BACKEND_HOST}${USER_ALL}`;

    let response = await getTo(url, userToken);

    if (response.error) {
      SweetAlert2.fire({
        icon: "info",
        title: response.error,
        confirmButtonText: "Aceptar"
      }).then();
    }

    return response.list;
  }

  const handleSearchText = (event) => {
    const textInTextBox = event.target.value;

    setSearchText(textInTextBox);

    const lowerText = textInTextBox;

    const newRows = rows.filter(row => {
      return Object.keys(row)
          .filter(field => field.toString() !== "photoUrl")
          .some(field => {
            return row[field].toString()
                .toLowerCase()
                .includes(lowerText);
          });
    });

    setFilteredRows(newRows);
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
      field: 'roles',
      headerName: 'Roles',
      headerClassName: classes.headerCell,
      flex: 1,
      headerAlign: 'center',
      align:'center'
    },
    {
      field: 'user actions',
      headerName: 'Acciones',
      flex: 0.7,
      headerClassName: classes.headerCell,
      renderCell: renderGetProfile,
      headerAlign: 'center',
      align:'center'
    }
  ];

  return (
      <div>
        <BlankLine/>

        <ThemeProvider theme={textTheme}>
          <Box style={{
            width: 400,
            position: 'absolute',
            right: 1250
          }}>
           <Typography>Usuarios por denuncias
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
                  textAlign: "center"
                }}>
                  {/*
                  <TextField onChange={handleSearchText}
                             value={searchText}
                             margin="normal"
                             label="🔍"
                             style={{width: 200, backgroundColor: '#f5fcff', borderRadius: 5}}
                             size={"small"}
                             autoFocus>
                  </TextField>
                  */}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

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

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
import {eventListViewStyles} from "../styles/events/ReportsListStyle";

import {AdminSwitch} from "../components/events/AdminSwitch";

import {matrixStyles} from "../styles/events/matrixStyles";

import {
  EVENTS_PATH, USER_BLOCK_URL, USER_ALL
} from "../constants/URLs";


import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid, esES } from '@mui/x-data-grid';
import { esES as pickersEsES } from '@mui/x-date-pickers/locales';
import { esES as coreEsES } from '@mui/material/locale';

const theme = createTheme(
    {
      palette: {
        primary: {
          main: '#1976d2'
        },
      },
    },
    esES,
    pickersEsES,
    coreEsES
);


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

    // getServicesWrapper().then(r => r);
  }, []);

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
        <div>
          <Button style={{float: 'right'}}
                  onClick={async () => {
                    //navigate(constants.PROFILE_URL + "/" + params.row.id)
                  }}> Ver eventos
          </Button>

          <Button style={{float: 'right'}}
                  onClick={async () => {
                    //navigate(constants.PROFILE_URL + "/" + params.row.id)
                  }}> Ver denuncias
          </Button>

          <Button style={{float: 'right'}}
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
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Correo',
      headerClassName: classes.headerCell,
      flex: 0.85,
    },
    {
      field: 'reportsNumber',
      headerName: 'Denuncias',
      headerClassName: classes.headerCell,
      flex: 0.7,
    },
    {
      field: 'lastReportDate',
      headerName: 'Última denuncia',
      headerClassName: classes.headerCell,
      flex: 0.7,
    },
    {
      field: 'roles',
      headerName: 'Roles',
      headerClassName: classes.headerCell,
      flex: 0.7,
    },
    {
      field: 'user actions',
      headerName: 'Acciones',
      flex: 0.5,
      headerClassName: classes.headerCell,
      renderCell: renderGetProfile
    }
  ];

  return (
      <div>
        <div>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell style={{
                  width: 300,
                  textAlign: "center"
                }}>
                  <TextField onChange={handleSearchText}
                             value={searchText}
                             margin="normal"
                             label="🔍"
                             style={{width: 200, backgroundColor: '#f5fcff', borderRadius: 5}}
                             size={"small"}
                             autoFocus>
                  </TextField>
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
          <ThemeProvider theme={theme}>
          <DataGrid
              rowClick="show"
              classes={{
                headerCell: classes.headerCell,
                row: classes.row}}
              rows={filteredRows}
              autoHeight={true}
              columns={columns}
              EnableHeadersVisualStyles={false}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10
                  }
                  },
              }}
              pageSizeOptions={[10, 25, 50]}/>
          </ThemeProvider>
        </div>
      </div>
  );
}

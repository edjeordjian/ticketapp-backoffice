import {createTheme} from "@mui/material/styles";
import {esES} from "@mui/x-data-grid";
import {esES as pickersEsES} from "@mui/x-date-pickers/locales/esES";
import {esES as coreEsES} from "@mui/material/locale";

const eventListViewStyles = {
    title: {
        fontSize: 24,
        fontWeight: "800",
        marginBottom: "15px",
    },
    eventsContainer: {
        display: "flex",
        flexDirection: "column",
        marginTop: "25px",
    },
    btnContainer: {
        width: "100%",
        marginBottom: "15px",
        flex: "1"
    },
};

const dataGridTheme = createTheme(
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

const textTheme = createTheme({
    typography: {
        fontSize: 18,
    }
});

export {
    eventListViewStyles, dataGridTheme, textTheme
};

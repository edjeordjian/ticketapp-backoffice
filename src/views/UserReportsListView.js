import {Button, Typography} from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {
    ADD_TO_GROUP_PATH, EVENT_CREATE_PATH, EVENT_ID_PARAM, EVENT_SUSPEND_URL, EVENT_VIEW_PATH, USER_BLOCK_URL
} from "../constants/URLs";
import { useMainContext } from "../services/contexts/MainContext";
import { BlankLine } from "../components/BlankLine";
import { Scrollbars } from 'react-custom-scrollbars';
import {patchTo} from "../services/helpers/RequestHelper";
import SweetAlert2 from "sweetalert2";

const styles = {
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


export default function UserReportsListView() {
    const navigate = useNavigate();

    const {logOut} = useMainContext();

    const [loading, setLoading] = React.useState(true);
    const [reportsToDisplay, setReportsToDisplay] = React.useState([]);
    const { getUserId, getUserToken } = useMainContext();
    const [userId, setUserId] = React.useState(getUserId());

    const [userToken, setUserToken] = React.useState(getUserToken());

    const {state} = useLocation();

    const [isBlocked, setIsBlocked] = React.useState(state ? state.user.isBlocked : false);

    let user;

    if (state) {
        user = state.user;
    }

    async function handleBlock() {
        const url = `${process.env.REACT_APP_BACKEND_HOST}${USER_BLOCK_URL}`;

        const requestBody = {
            email: user.email,
            block: ! isBlocked
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
            }).then(_ => setIsBlocked(! isBlocked));
        }
    }

    const displayReports = (source) => {
        return (
            <Box key={source.eventId}>
                <a
                    onClick={() =>
                        navigate(`${EVENT_VIEW_PATH}?${EVENT_ID_PARAM}=${source.eventId}`)
                    }>
                    <Typography variant="h4"
                                color={"#3a50ba"}
                                display={"block"}>
                        {source.eventName}
                    </Typography>
                </a>

                <BlankLine />

                <Typography variant="h5"
                            display="block">
                    Fecha: {source.date}
                </Typography>

                <BlankLine />

                <Typography variant="h5"
                            display="block">
                    <strong> Motivo: </strong>
                </Typography>

                <Typography variant="h5"
                            display="block">
                    {source.reason}
                </Typography>

                <BlankLine />

                <Typography variant="h5"
                            display="block">
                    <strong> Texto de la denuncia: </strong>
                </Typography>

                <Typography variant="h5"
                            display="block">
                    {source.text}
                </Typography>

                <BlankLine number={2}/>
            </Box>
        );
    };

    const onCreateEventClicked = (_) => {
        navigate(EVENT_CREATE_PATH);
    };

    const navigateToAddGroupMemberScreen = () => {
        navigate(ADD_TO_GROUP_PATH);
    }

    React.useEffect(() => {
        if (user.reports) {
            setReportsToDisplay(user.reports);
        }

        setLoading(false);
    }, []);

    return (
            <Box style={{
                marginLeft: "250px",
                padding: "25px"
            }}>
                <Box style={{
                    display: "flex"
                }}>
                    <Typography variant={"h4"}
                                style={{
                                    flex: "3"
                                }}>
                        Eventos denunciados por {user.name}
                    </Typography>

                    <Button onClick={async () => {
                        await handleBlock()
                    }}>
                        {
                            (isBlocked) ? "Activar usuario" : "Suspender usuario"
                        }
                    </Button>
                </Box>

                <BlankLine number={2}/>

                <Scrollbars style={{
                    width: 1400,
                    height: 1000
                }}>
                    {loading ? (
                        <p></p>
                    ) : (
                        <Box styles={styles.eventsContainer}>
                            {reportsToDisplay.map((report) => {
                                return displayReports(report);
                            })}
                        </Box>
                    )}
                </Scrollbars>
            </Box>
    );
}

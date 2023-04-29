import { Typography } from "@mui/material";
import { getTo, postTo } from "../services/helpers/RequestHelper";
import { Box } from "@mui/system";
import * as React from "react";
import BasicBtn from "../components/BasicBtn";
import DashboardDrawer from "../components/DashboardDrawer";
import { useNavigate } from "react-router-dom";
import {
  ADD_TO_GROUP_PATH,
  EVENT_CREATE_PATH,
  EVENT_ID_PARAM,
  EVENT_SEARCH_NAME_URL,
  EVENT_VIEW_PATH,
  OWNER_PARAM
} from "../constants/URLs";
import { EVENT_URL, EVENTS_PATH } from "../constants/URLs";
import * as SweetAlert2 from "sweetalert2";
import { useMainContext } from "../services/contexts/MainContext";
import { BlankLine } from "../components/BlankLine";

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

export default function EventsListView(props) {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(true);
  const [selectableEvents, setSelectableEvents] = React.useState([]);
  const { getUserId, getUserToken } = useMainContext();
  const [userId, setUserId] = React.useState(getUserId());

  const [userToken, setUserToken] = React.useState(getUserToken());

  React.useEffect(() => {
    getTo(
      `${process.env.REACT_APP_BACKEND_HOST}${EVENT_SEARCH_NAME_URL}?${OWNER_PARAM}=${userId}`,
      userToken
    ).then((res) => {
      if (res.error !== undefined) {
        SweetAlert2.fire({
          title: res.error,
          icon: "error",
        }).then();
      } else {
        setSelectableEvents(res.events);
      }
      setLoading(false);
    });
  }, []);

  const displayProject = (source) => {
    return (
      <a
        onClick={() =>
          navigate(`${EVENT_VIEW_PATH}?${EVENT_ID_PARAM}=${source.id}`)
        }
        key={source.id}
      >
        <Typography variant="h3" display="block">
          {source.name}
        </Typography>

        <img
          alt="Sin imagen"
          width={"100%"}
          height={"400px"}
          style={{ borderRadius: 20, marginTop: "25px" }}
          src={source.pictures ? source.pictures[0] : ""}
        />

        <BlankLine />
      </a>
    );
  };

  const onCreateEventClicked = (_) => {
    navigate(EVENT_CREATE_PATH);
  };

  const navigateToAddGroupMemberScreen = () => {
    navigate(ADD_TO_GROUP_PATH);
  }

  return (
    <>
      <Box style={{ marginLeft: "250px", padding: "25px" }}>
         <div style={{
           display: "flex",
           width: "100%",
           alignItems: "center"
         }}>
          <Box style={styles.btnContainer}>
            <BasicBtn label={"Crear evento"}
                      onClick={onCreateEventClicked} />
          </Box>

          <Box style={{ marginLeft: "auto" }}>
            <BasicBtn label={"Miembros de staff"}
                      onClick={navigateToAddGroupMemberScreen} />
          </Box>
        </div>

        <BlankLine/>

        <BlankLine/>

        {loading ? (
          <p></p>
        ) : (
          <Box styles={styles.eventsContainer}>
            {selectableEvents.map((event) => {
              return displayProject(event);
            })}
          </Box>
        )}
      </Box>
    </>
  );
}

import Grid from "@mui/material/Grid";
import { Button, IconButton, TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ClearIcon from "@mui/icons-material/Clear";
import * as React from "react";
import SweetAlert2 from "sweetalert2";
import { createEventStyle as createEventStyles } from "../styles/events/CreateEventStyle";
import BasicBtn from "../components/BasicBtn";
import { useMainContext } from "../services/contexts/MainContext";
import { getTo, postTo } from "../services/helpers/RequestHelper";
import { CREATED_EVENT_LBL, MEMBERS_ADDED_TO_GROUP_LBL } from "../constants/EventConstants";
import { ADD_TO_GROUP_URL, EVENTS_PATH, GROUP_URL } from "../constants/URLs";
import { BlankLine } from "../components/BlankLine";

const AddGroupMember = () => {
  const [members, setMembers] = React.useState([]);

  const [memberEmail, setMemberEmail] = React.useState("");

  const [memberNames, setMemberNames] = React.useState([]);

  const { getUserData, getUserToken } = useMainContext();

  const [userToken, setUserToken] = React.useState(getUserToken());

  const handleAddMember = () => {
    let bool = memberEmail.toLowerCase()
                          .match(/\S+@\S+\.\S+/);

    if (bool) {
      setMembers([...members, memberEmail]);
      setMemberEmail("");
    } else {
      SweetAlert2.fire({
        title: "Por favor, complete correctamente el campo con un mail valido",
        icon: "error",
      }).then();
    }
  };

  const handleRemoveMember = async (index) => {
    members.splice(index, 1);
    setMembers([...members]);
  };

  const getExistingMembers = () => {
    getTo(`${process.env.REACT_APP_BACKEND_HOST}${GROUP_URL}`,
      userToken).then(res => {
        if (res.error) {
          SweetAlert2.fire({
            icon: "error",
            title: res.error,
          }).then();
        } else {
          setMemberNames(res.members);
        }
    }).then();
  }

  const handleStaffAdd = () => {
    const body = {
      assistants: members
    }

    postTo(`${process.env.REACT_APP_BACKEND_HOST}${ADD_TO_GROUP_URL}`,
      body,
      userToken).then(res => {
      if (res.error) {
        SweetAlert2.fire({
          icon: "error",
          title: res.error,
        }).then();
      } else {
        SweetAlert2.fire({
          icon: "info",
          title: MEMBERS_ADDED_TO_GROUP_LBL,
        }).then(() => {
          getExistingMembers();

          setMembers([]);
        });
      }
    });
  }

  const onEventMemberType = (e) => {
    setMemberEmail(e.target.value);
  };

  React.useEffect(() => {
    getExistingMembers();
  },
    []);

  return (
    <main style={{ backgroundColor: "#eeeeee", minHeight: "100vh" }}>
      <Box style={createEventStyles.formContainer}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid item container direction="column" md={10}>
          <TextField
            sx={{ paddingBottom: 2 }}
            value={memberEmail}
            onChange={onEventMemberType}
            variant="outlined"
            placeholder="Mail del integrante del equipo"
          />
        </Grid>

        <IconButton
          type={"button"}
          variant="contained"
          onClick={handleAddMember}
          size="large"
        >
          <AddCircleOutlineIcon color="primary" fontSize="large" />
        </IconButton>
      </Grid>

      <Box>
        {members.map((member, i) => (
          <Box key={i}>
            {
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Grid
                  item
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  md={10}
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    {member}
                  </Typography>
                </Grid>
                <IconButton
                  type={"button"}
                  variant="contained"
                  onClick={async () => handleRemoveMember(i)}
                  size="large"
                >
                  <ClearIcon color="primary" fontSize="large" />
                </IconButton>
              </Grid>
            }
          </Box>
        ))}
      </Box>

        <Button variant="contained"
          onClick={handleStaffAdd}>Agregar como staff
        </Button>

        <BlankLine/>

        <Grid>
          <h1>Staff</h1>
          <ul>
            {memberNames.map(member => (
              <li key={member}>{member}</li>
            ))}
          </ul>
        </Grid>
    </Box>
  </main>
  );
};

export {
  AddGroupMember
}

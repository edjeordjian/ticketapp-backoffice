import React, { useEffect, useState } from "react";
import {Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {EVENTS_PATH} from "../constants/URLs";
import {useMainContext} from "../services/contexts/MainContext";
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';



export default function DashboardDrawer() {
    const [optionSelected, setOptionSelected] = useState(true);
    const { getUserData } = useMainContext();
    const [userData, setUserData] = useState({})

    const navigate = useNavigate();

    const {logOut} = useMainContext();

    const handleLogOut = () => {
        logOut();
        navigate("/");
    }

    useEffect(() => {
        const data = getUserData();
        setUserData(data);
    }, []);

    return (
        <Drawer
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                    zIndex: 1
                },
            }}
            variant="permanent"
            anchor="left"
            className="office-dashboard-drawer">
            <Toolbar style={{
              padding: '15px',
              display: 'flex',
              justifyContent: 'space-around'}}>
                <img referrerPolicy="no-referrer" style={{
                  height: '50px',
                  width: '50px',
                  borderRadius: '10px',
                  padding: '5px'}} src={userData.photoURL}/>
                <p style={{
                  color: '#1F1F22',
                  padding: '5px',
                  fontSize: '12px'}}>{userData.email}</p>
            </Toolbar>
            <Divider/>
            <List>
                <ListItem button key={"Eventos"}
                          style={{color: optionSelected ? "#6B7DE5" : "#252733"}}
                          className="dashboard-item">
                    <ListItemButton>
                          <ListItemIcon>
                            <EventIcon/>
                          </ListItemIcon>
                        <ListItemText primary={"Eventos"} onClick={() => navigate(EVENTS_PATH)}/>
                    </ListItemButton>
                </ListItem>
            </List>
            <div style={{marginTop: 'auto'}}>
            <Divider/>
            <ListItem button key={"Salir"}
                      style={{color: optionSelected ? "#6B7DE5" : "#252733"}}
                      className="dashboard-item">
                      <ListItemButton>
                          <ListItemIcon>
                            <LogoutIcon/>
                          </ListItemIcon>
                          <ListItemText primary={"Salir"} onClick={() => handleLogOut()}/>
                    </ListItemButton>
            </ListItem>
            </div>
        </Drawer>
    );
}

import React from 'react'

import {Button, TextField} from "@mui/material";

import {useMainContext} from "../../services/contexts/MainContext";

import {auth} from "../../services/helpers/FirebaseService";

import {useNavigate} from "react-router-dom";

import Typography from "@mui/material/Typography";

import {AUTHENTICATION_ERR_LBL, BACKEND_HOST, LOG_IN_LBL} from "../../constants/LogInConstants";

import SweetAlert2 from 'sweetalert2';

import {signInButtonStyle} from "../../styles/login/SignInButtonStyle";

import {postTo} from "../../services/helpers/RequestHelper";

import {EVENTS_PATH, REPORTS_PATH, SIGN_IN_URL, USER_REPORTS_PATH} from "../../constants/URLs";

import Box from "@mui/material/Box";

import {signInWithEmailAndPassword,
    createUserWithEmailAndPassword} from "firebase/auth";


const SignInButton = (props) => {
    const navigate = useNavigate();

    const {logIn} = useMainContext();

    const emailRef = React.useRef("");

    const passwordRef = React.useRef("");

    const handleEmailBlur = (e) => {
        if (! e.target){
            return;
        }

        emailRef.current = e.target.value;
    }

    const handlePasswordBlur = (e) => {
        if (! e.target){
            return;
        }

        passwordRef.current = e.target.value;
    }

    const handleSignIn = async (e) => {
        let firebaseResponse = await signInWithEmailAndPassword(auth,
            emailRef.current,
            passwordRef.current
        ).catch(async (err) => {
                console.log(err.toString());

                return {
                    error: err.toString()
                };
            } );

        /*
        if (firebaseResponse && firebaseResponse.error) {
            console.log(firebaseResponse.error);
        }  */

      if (firebaseResponse.error
            && firebaseResponse.error.includes("auth/user-not-found")) {
            firebaseResponse = await createUserWithEmailAndPassword(auth,
                emailRef.current,
                passwordRef.current
            ).catch((error) => {
                console.log(error.toString());

                return error.toString();
            });
        }

        if (firebaseResponse.user === undefined) {
            SweetAlert2.fire({
                icon: "info",
                title: AUTHENTICATION_ERR_LBL
            }).then();

            return;
        }

        const idToken = await auth.currentUser.getIdToken();

        const user = firebaseResponse.user;

        const uid = user.providerData[0].uid;

        const requestBody = {
            email: user.email,
            isAdministrator: true
        };

        const response = await postTo(`${BACKEND_HOST}${SIGN_IN_URL}`,
                                      requestBody,
                                      idToken);

        if (response.error) {
            SweetAlert2.fire({
                icon: "info",
                title: response.error,
                confirmButtonText: "Aceptar"
            }).then();
        } else {
            const userData = {
                id: uid,
                email: user.email
            };

            logIn(userData, idToken);

            navigate(USER_REPORTS_PATH);
        }
    };

    return (
        <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
                onBlur={handleEmailBlur}
                margin="normal"
                fullWidth
                label={"Correo"}
                autoFocus
            />

            <TextField
                onBlur={handlePasswordBlur}
                margin="normal"
                fullWidth
                label={"Contraseña"}
                type="password"
            />

            <Button
                mode="contained"
                onClick={handleSignIn}
                style={signInButtonStyle}>
                <Typography style={
                    {color: '#757575',
                        fontWeight: '800',
                        textTransform: 'none',
                        fontSize: '18px'}
                }>{LOG_IN_LBL}
                </Typography>
            </Button>
        </Box>
    );
}

export default SignInButton;

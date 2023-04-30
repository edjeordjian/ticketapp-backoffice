import {BrowserRouter} from 'react-router-dom';
import {useMemo, useState} from "react";
import DashboardDrawer from "./components/DashboardDrawer";
import {LoggedRouter} from "./services/routers/LoggedRouter";
import {NotLoggedRouter} from "./services/routers/NotLoggedRouter";
import {MainContext, useMainContext} from "./services/contexts/MainContext";

const getLoggedInValue = () => {
  return localStorage.getItem("loggedIn");
};

const checkLoggedIn = () => {
  return !! getLoggedInValue();
};

const logOut = (setLoggedIn) => {
  localStorage.setItem("loggedIn", "");

  setLoggedIn(false);
};

const logIn = (userData,
               idToken,
               setLoggedIn) => {
  localStorage.setItem( "user-data", JSON.stringify({
    ...userData,
    ...{
      "token": idToken
    }
    }));

  localStorage.setItem("loggedIn", "true");

  setLoggedIn(true);
};

const getUserData = () => {
  return JSON.parse( localStorage.getItem("user-data") );
};

const getUserId = () => {
  return getUserData().id;
};

const getUserToken = () => {
  return getUserData().token;
};

const DisplayApp = () => {
  const {isLoggedIn,
        checkLoggedIn} = useMainContext();

  // The fact that isLoggedIn is a state variable (created with useState)
  // makes possible that the URIs and screens change dynamically. But the
  // variable itself should not be modified directly, so as to avoid a
  // state-render loop.
  return (
      <>
        {
          /*{ (checkLoggedIn() && isLoggedIn) }*/
          (isLoggedIn) ? (
              <BrowserRouter>
                <DashboardDrawer/>
                <LoggedRouter/>
              </BrowserRouter>
          ) : (
              <BrowserRouter>
                <NotLoggedRouter/>
              </BrowserRouter>
          )
        }
      </>
  );
};

const App = () => {
  // State (from useState) is lost on page refresh, so it cannot
  // be used directly to persist data across screens. UseMemo and
  // context are used here to accomplish dynamic behavior
  // on a state change (for example, showing different screens
  // for the user once they have logged in).
  //
  // Changing the state causes a render, so if it is used incorrectly, it
  // can cause a state-render loop.
  const  [isLoggedIn, setIsLoggedIn] = useState(getLoggedInValue());

  const context = useMemo( () => {
        return ( {
          isLoggedIn,

          checkLoggedIn,

          logOut: () => logOut(setIsLoggedIn),

          logIn: (userData, idToken) => logIn(userData,
                                              idToken,
                                              setIsLoggedIn),
          getUserData,

          getUserToken,

          getUserId
        } );
      },
      [isLoggedIn, setIsLoggedIn]);

  return (
      <MainContext.Provider value={context}>
        <DisplayApp/>
      </MainContext.Provider>
  );
};

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { useJsApiLoader } from "@react-google-maps/api";

import { MAPS_KEY } from "./constants/EventConstants";

function MapLoader({ children }) {
  const { isLoaded } = useJsApiLoader({
    language: "es",
    googleMapsApiKey: MAPS_KEY,
    libraries: ["places"]
  });

  return isLoaded ? children : null;
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <MapLoader>
    <App />
    </MapLoader>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


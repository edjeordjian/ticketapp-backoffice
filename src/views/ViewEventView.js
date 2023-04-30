import * as React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {getTo} from "../services/helpers/RequestHelper";
import Grid from "@mui/material/Grid";
import UploadAndDisplayImage from "../components/UploadAndDisplayImage";
import BasicDatePicker from "../components/BasicDatePicker";
import InputTags from "../components/TagField";

import {EVENT_ID_PARAM, EVENT_TYPES_URL, EVENT_URL, EVENT_VIEW_PATH, EVENTS_PATH} from "../constants/URLs";

import {BlankLine} from "../components/BlankLine";
import 'react-quill/dist/quill.snow.css';

import {createEventStyle as createEventStyles} from "../styles/events/CreateEventStyle";

import SweetAlert2 from 'sweetalert2';

import {CREATED_EVENT_LBL, GET_EVENT_ERROR, UPLOAD_IMAGE_ERR_LBL} from "../constants/EventConstants";
import {useNavigate, useSearchParams} from "react-router-dom";

import FullCalendar from '@fullcalendar/react';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { tagStyle } from "../styles/events/EventStyles";
import { ImageCarousel } from "../components/events/ImageCarousel";
import { turnDateStringToToday } from "../services/helpers/DateService";
import ReactHtmlParser from "react-html-parser";
import { useMainContext } from "../services/contexts/MainContext";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

const ViewEventView = () => {
    const [name, setName] = React.useState("");

    const [richDescription, setRichDescription] = React.useState("");

    const [capacity, setCapacity] = React.useState("");

    const [types, setTypes] = React.useState([]);

    const [images, setImages] = React.useState([]);

    const [selectedDate, setSelectedDate] = React.useState(null);

    const [selectedTime, setSelectedTime] = React.useState(null);

    const [address, setAddress] = React.useState("");

    const [selectableTypes, setSelectableTypes] = React.useState([]);

    const [loading, setLoading] = React.useState(true);

    const [events, setEvents] = React.useState([]);

    const [searchParams, setSearchParams] = useSearchParams();

    const [organizerName, setOrganizerName] = React.useState("");

    const { getUserId, getUserToken } = useMainContext();

    const [userToken, setUserToken] = React.useState(getUserToken());

    const [center, setCenter] = React.useState(null);

    const [questions, setQuestions] = React.useState([]);

    const navigate = useNavigate();

  const getEventData = async () => {
    const eventId = searchParams.get(EVENT_ID_PARAM);

        getTo(`${process.env.REACT_APP_BACKEND_HOST}${EVENT_URL}?${EVENT_ID_PARAM}=${eventId}`,
          userToken)
            .then(response => {
                if (response.error) {
                    SweetAlert2.fire({
                        title: GET_EVENT_ERROR,
                        icon: "error"
                    }).then();

                    setLoading(false);

                    return;
                }

                setName(response.name);

                setRichDescription(response.description);

                setCapacity(response.capacity);

                setTypes(response.types_names);

                setSelectedDate(response.date);

                setSelectedTime(response.time);

                setAddress(response.address);

                setOrganizerName(response.organizerName);

                setQuestions(response.faq);

                if (response.latitude && response.longitude) {
                    setCenter({
                        lat: Number(response.latitude),
                        lng: Number(response.longitude)
                    });
                }

                const mappedSpaces = response.agenda.map((space) => {
                    return {
                        title: space.title,
                        start: turnDateStringToToday(space.start),
                        end: turnDateStringToToday(space.end, true)
                    }
                })

                setEvents(mappedSpaces);

                const definedImages = [];

                if (response.pictures.length > 0) {
                    definedImages.push(response.pictures[0]);
                }

                if (response.pictures.length > 1) {
                    definedImages.push(response.pictures[1]);
                }

                if (response.pictures.length > 2) {
                    definedImages.push(response.pictures[2]);
                }

                if (response.pictures.length > 3) {
                    definedImages.push(response.pictures[3]);
                }

                if (response.pictures.length > 4) {
                    definedImages.push(response.pictures[4]);
                }

                setImages(definedImages);

                setLoading(false);
            });
    }

    React.useEffect(() => {
        getTo(`${process.env.REACT_APP_BACKEND_HOST}${EVENT_TYPES_URL}`,
          userToken)
            .then(res => {
                if (res.error !== undefined) {
                    SweetAlert2.fire({
                        title: res.error,
                        icon: "error"
                    }).then();
                } else {
                    setSelectableTypes(res.event_types);
                }
            })
            .then(getEventData);
    }, []);

    return (
        <main style={{backgroundColor: "#eeeeee", minHeight: "100vh"}}>
            <Box style={createEventStyles.formContainer}>
                <Typography variant="h1">{name}
                </Typography>

                <BlankLine/>

                <ImageCarousel images={images}/>

                <BlankLine number={2}/>

                {loading ? (
                    <p></p>
                ) : (
                    types.map((type, idx) => (
                        <b key={idx}
                           style={tagStyle}>{type}
                        </b>
                    ))
                )}

                <BlankLine number={2}/>

                {center ? (
                  <GoogleMap
                    mapContainerStyle={{
                        width: "800px",
                        height: "400px"
                    }}

                    center={center}

                    zoom={17}
                  >
                      <MarkerF position={center} />
                  </GoogleMap>
                ) : <></>}

                <BlankLine />

                <div>{ReactHtmlParser(richDescription)}
                </div>

                <BlankLine number={2}/>

                <Typography variant="h5"><b>Capacidad</b>: {capacity}
                </Typography>

                <BlankLine/>

                <Typography variant="h5"><b>Dirección</b>: {address}
                </Typography>

                <BlankLine/>

                <Typography variant="h5"><b>Fecha</b>: {selectedDate}
                </Typography>

                <BlankLine/>

                <Typography variant="h5"><b>Hora</b>: {selectedTime}
                </Typography>

                <BlankLine/>

                <Typography variant="h5"><b>Organizador</b>: {organizerName}
                </Typography>

                <BlankLine/>

                <Typography variant="h5">
                    <b>FAQ</b>
                </Typography>

                <Box>
                    {questions.map((question, i) => (
                      <Box key={i}>
                          {
                              <Box>
                                  <Typography sx={{ fontWeight: "bold" }}>
                                      P: {question.question}
                                  </Typography>
                                  <Typography sx={{ fontStyle: "italic" }}>
                                      R: {question.answer}
                                  </Typography>
                              </Box>
                          }
                      </Box>
                    ))}
                </Box>

                <BlankLine/>

                {loading ? (
                    <p></p>
                ) : (
                    <FullCalendar
                        plugins={[timeGridPlugin, interactionPlugin]}
                        editable={false}
                        selectable={false}
                        initialView='timeGridDay'
                        dayHeaderContent={() => ''}
                        slotLabelInterval={{minutes: 30}}
                        contentHeight="1000px"
                        events={events}
                        allDaySlot={false}
                        headerToolbar={false}
                        eventResizableFromStart={true}/>)}
            </Box>
        </main>
    );
}

export {
    ViewEventView
};

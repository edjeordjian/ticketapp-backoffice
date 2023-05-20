import * as React from "react";

import {Box, Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import {getTo, patchTo} from "../services/helpers/RequestHelper";

import {
    EVENT_ID_PARAM, EVENT_SUSPEND_URL,
    EVENT_TYPES_URL,
    EVENT_URL,
    EVENT_VIEW_PATH,
    EVENTS_PATH,
    GET_REPORTS_PARAM
} from "../constants/URLs";

import {BlankLine} from "../components/BlankLine";
import {createEventStyle as createEventStyles} from "../styles/events/CreateEventStyle";

import SweetAlert2 from 'sweetalert2';

import {CREATED_EVENT_LBL, GET_EVENT_ERROR, UPLOAD_IMAGE_ERR_LBL} from "../constants/EventConstants";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";

import FullCalendar from '@fullcalendar/react';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { tagStyle } from "../styles/events/EventStyles";
import { ImageCarousel } from "../components/events/ImageCarousel";
import { turnDateStringToToday } from "../services/helpers/DateService";
import ReactHtmlParser from "react-html-parser";
import { useMainContext } from "../services/contexts/MainContext";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

import { Scrollbars } from 'react-custom-scrollbars';

const EventView = () => {
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

    const {state} = useLocation();

    const [isBlocked, setIsBlocked] = React.useState(state ? state.event.isBlocked : false);

    const [reports, setReports] = React.useState([]);

    const navigate = useNavigate();

    let event;

    if (state) {
        event = state.event;
    }

  const getEventData = async () => {
    const eventId = searchParams.get(EVENT_ID_PARAM);

        getTo(`${process.env.REACT_APP_BACKEND_HOST}${EVENT_URL}?${EVENT_ID_PARAM}=${eventId}&${GET_REPORTS_PARAM}=true`,
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

                setReports(response.reports);

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

  async function handleSuspend() {
        const url = `${process.env.REACT_APP_BACKEND_HOST}${EVENT_SUSPEND_URL}`;

        const requestBody = {
            eventId: event.id,

            suspend: ! isBlocked
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

    if (loading) {
        return <p></p>
    }

    return (
        <main style={{backgroundColor: "#eeeeee", minHeight: "100vh"}}>
            <Box style={createEventStyles.formContainer}>
                <Box style={{
                    display: "flex"
                }}>
                    <Typography variant={"h2"}
                                style={{
                                    flex: "3"
                                }}>{name}
                    </Typography>

                    <Button onClick={async () => {
                        await handleSuspend()
                    }}>
                        {
                            (isBlocked) ? "Activar evento" : "Suspender evento"
                        }
                    </Button>
                </Box>

                <BlankLine number={2}/>

                <Typography variant="h3">
                    <strong>Denuncias</strong>
                </Typography>

                <BlankLine/>

                    <Scrollbars
                        style={{
                            width: 1400,
                            height: 600,
                        }}>
                        {
                            (reports.map((report, idx) => {
                                    return (
                                        <Box key={idx}>
                                            <Typography variant="h5"
                                                        display="block">
                                                Usuario: {report.reporter}
                                            </Typography>

                                            <BlankLine />

                                            <Typography variant="h5"
                                                        display="block">
                                                Fecha: {report.date}
                                            </Typography>

                                            <BlankLine />

                                            <Typography variant="h5"
                                                        display="block">
                                                <strong> Motivo: </strong>
                                            </Typography>

                                            <Typography variant="h5"
                                                        display="block">
                                                {report.reason}
                                            </Typography>

                                            <BlankLine />

                                            <Typography variant="h5"
                                                        display="block">
                                                <strong> Texto de la denuncia: </strong>
                                            </Typography>

                                            <Typography variant="h5"
                                                        display="block">
                                                {report.text}
                                            </Typography>

                                            <BlankLine number={2} />
                                        </Box>
                                    )
                                }
                                )
                                : {}
                            )
                        }
                    </Scrollbars>

                <BlankLine number={2}/>

                <Typography variant="h3">
                    <strong>Información del evento</strong>
                </Typography>

                <BlankLine/>

                <ImageCarousel images={images}/>

                <BlankLine number={2}/>

                {(
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
    EventView
};

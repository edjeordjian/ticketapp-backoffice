/* URIs */
const SIGN_IN_URL = "/signin";

const EVENT_URL = "/event";

const EVENT_SEARCH_NAME_URL = "/event/all";

const EVENT_TYPES_URL = EVENT_URL + "/types";

const GROUP_URL = `${EVENT_URL}/group`;

const ADD_TO_GROUP_URL = `${GROUP_URL}/addUsers`;

/* Params */
const EVENT_ID_PARAM = "eventId";

const OWNER_PARAM = "owner"

/* Paths */
const EVENT_CREATE_PATH =  "/events/create";

const EVENTS_PATH = "/events";

const LOG_IN_PATH = "/login";

const EVENT_VIEW_PATH = "/event/view"

const ADD_TO_GROUP_PATH = "/group";

export {
    SIGN_IN_URL, EVENT_URL, EVENT_SEARCH_NAME_URL, EVENT_TYPES_URL,
    EVENT_CREATE_PATH, EVENTS_PATH, LOG_IN_PATH, EVENT_VIEW_PATH,
    EVENT_ID_PARAM, OWNER_PARAM, ADD_TO_GROUP_PATH, ADD_TO_GROUP_URL,
    GROUP_URL
};

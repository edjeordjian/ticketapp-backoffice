/* URIs */
const SIGN_IN_URL = "/signin";

const EVENT_URL = "/event";

const EVENT_SEARCH_NAME_URL = "/event/all";

const EVENT_TYPES_URL = EVENT_URL + "/types";

const GROUP_URL = `${EVENT_URL}/group`;

const ADD_TO_GROUP_URL = `${GROUP_URL}/addUsers`;

const USER_URL = "/user";

const USER_BLOCK_URL = `${USER_URL}/block`;

const USER_ALL = `${USER_URL}/all`;

const USER_REPORTS = `${USER_URL}/reports`;


/* Params */
const EVENT_ID_PARAM = "eventId";

const GET_REPORTS_PARAM = "withReports"

const ADMIN_PARAM = "admin";

const START_DATE_PARAM = "startDate";

const END_DATE_PARAM = "endDate";


/* Paths */
const EVENT_CREATE_PATH =  "/events/create";

const EVENTS_PATH = "/events";

const REPORTS_PATH = "/reports";

const USER_REPORTS_PATH = "/user/reports";

const EVENT_REPORTS_PATH = "/event/reports";

const LOG_IN_PATH = "/login";

const EVENT_VIEW_PATH = "/event/view"

const ADD_TO_GROUP_PATH = "/group";


export {
    SIGN_IN_URL, EVENT_URL, EVENT_SEARCH_NAME_URL, EVENT_TYPES_URL,
    EVENT_CREATE_PATH, EVENTS_PATH, LOG_IN_PATH, EVENT_VIEW_PATH,
    EVENT_ID_PARAM, ADMIN_PARAM, ADD_TO_GROUP_PATH, ADD_TO_GROUP_URL,
    GROUP_URL, USER_BLOCK_URL, USER_ALL, REPORTS_PATH,
    USER_REPORTS, GET_REPORTS_PARAM, START_DATE_PARAM, END_DATE_PARAM,
    USER_REPORTS_PATH, EVENT_REPORTS_PATH
};

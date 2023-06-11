/* URIs */
const SIGN_IN_URL = "/signin";

const EVENT_URL = "/event";

const EVENT_SEARCH_NAME_URL = "/event/all";

const ATTENDANCES_TOTAL_STATS_URL = `${EVENT_URL}/attendances/total/stats`;

const EVENT_TYPES_URL = EVENT_URL + "/types";

const GROUP_URL = `${EVENT_URL}/group`;

const ADD_TO_GROUP_URL = `${GROUP_URL}/addUsers`;

const USER_URL = "/user";

const USER_BLOCK_URL = `${USER_URL}/block`;

const USER_ALL = `${USER_URL}/all`;

const EVENT_CANCEL_URL = `${EVENT_URL}/cancel`;

const EVENT_SUSPEND_URL = `${EVENT_URL}/suspend`;

const TOP_ORGANIZERS_URL = "/organizer/top";

const REPORTS_STATS_URL = `${EVENT_URL}/report/stats`;

const EVENTS_DATES_STATS_URL = `${EVENT_URL}/date/stats`;

const EVENT_STATUS_STATS_URL = `${EVENT_URL}/status/stats`;

const HISTORIC_STATS_URL ='/stats/panel';

const TOP_REPORTED_ORGANIZRS_URL = "/organizer/reported/top";

const ALL_STATS_URL = "/stats/all";



/* Params */
const EVENT_ID_PARAM = "eventId";

const GET_REPORTS_PARAM = "withReports"

const ADMIN_PARAM = "admin";

const START_DATE_PARAM = "startDate";

const END_DATE_PARAM = "endDate";

const FILTER_PARAM = "filter";



/* Paths */
const EVENT_CREATE_PATH =  "/events/create";

const EVENTS_PATH = "/events";

const REPORTS_PATH = "/reports";

const USER_REPORTS_PATH = "/user/reports";

const EVENT_REPORTS_PATH = "/event/reports";

const STATS_PATH = "/stats";

const USER_REPORTS_LIST_PATH = `${USER_REPORTS_PATH}/list`;

const EVENT_REPORTS_LIST_PATH = `${EVENT_REPORTS_PATH}/list`;

const LOG_IN_PATH = "/login";

const EVENT_VIEW_PATH = "/event/view"

const ADD_TO_GROUP_PATH = "/group";


/* Hosts */
const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;



export {
    SIGN_IN_URL, EVENT_URL, EVENT_SEARCH_NAME_URL, EVENT_TYPES_URL,
    EVENT_CREATE_PATH, EVENTS_PATH, LOG_IN_PATH, EVENT_VIEW_PATH,
    EVENT_ID_PARAM, ADMIN_PARAM, ADD_TO_GROUP_PATH, ADD_TO_GROUP_URL,
    GROUP_URL, USER_BLOCK_URL, USER_ALL, REPORTS_PATH,
    GET_REPORTS_PARAM, START_DATE_PARAM, END_DATE_PARAM, USER_REPORTS_PATH,
    EVENT_REPORTS_LIST_PATH, EVENT_REPORTS_PATH, USER_REPORTS_LIST_PATH,
    EVENT_CANCEL_URL, EVENT_SUSPEND_URL, BACKEND_HOST, STATS_PATH,
    TOP_ORGANIZERS_URL, REPORTS_STATS_URL, FILTER_PARAM, EVENTS_DATES_STATS_URL,
    EVENT_STATUS_STATS_URL, HISTORIC_STATS_URL, ATTENDANCES_TOTAL_STATS_URL,
    TOP_REPORTED_ORGANIZRS_URL, ALL_STATS_URL
};

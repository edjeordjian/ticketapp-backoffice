import {Route, Routes} from "react-router-dom";
import {
    ADD_TO_GROUP_PATH, EVENT_CREATE_PATH, EVENT_REPORTS_PATH, EVENT_VIEW_PATH,
    EVENTS_PATH, LOG_IN_PATH, REPORTS_PATH, USER_REPORTS, USER_REPORTS_PATH
} from "../../constants/URLs";
import CreateEventView from "../../views/CreateEventView";
import UserReportsTableView from "../../views/UserReportsTableView";
import SignInSide from "../../components/SignIn";
import {EventView} from "../../views/EventView";
import { AddGroupMember } from "../../views/AddGroupMember";
import EventsListView from "../../views/EventsListView";
import UserReportsListView from "../../views/UserReportsListView";
import EventsReportsTableView from "../../views/EventsReportsTableView";

const LoggedRouter = () => {
    /* Remember to add "exact" to allow users to type the endpoint directly. */
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<UserReportsTableView/>} />

                <Route exact path={LOG_IN_PATH} element={<SignInSide />} />

                <Route exact path={USER_REPORTS_PATH} element={<UserReportsTableView/>}/>

                <Route exact path={EVENT_REPORTS_PATH} element={<EventsReportsTableView/>}/>

                <Route exact path={EVENTS_PATH} element={<EventsListView/>}/>

                <Route exact path={USER_REPORTS} element={<UserReportsListView/>}/>

                <Route exact path={EVENT_CREATE_PATH} element={<CreateEventView/>}/>

                <Route exact path={EVENT_VIEW_PATH} element={<EventView/>}/>

                <Route exact path={ADD_TO_GROUP_PATH} element={<AddGroupMember/>}/>
            </Routes>
        </div>
    );
};

export {
    LoggedRouter
};

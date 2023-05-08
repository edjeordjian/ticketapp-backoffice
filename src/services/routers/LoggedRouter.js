import {Route, Routes} from "react-router-dom";
import {
    ADD_TO_GROUP_PATH, EVENT_CREATE_PATH, EVENT_VIEW_PATH,
    EVENTS_PATH, LOG_IN_PATH, REPORTS_PATH
} from "../../constants/URLs";
import CreateEventView from "../../views/CreateEventView";
import ReportsListView from "../../views/ReportsListView";
import SignInSide from "../../components/SignIn";
import {ViewEventView} from "../../views/ViewEventView";
import { AddGroupMember } from "../../views/AddGroupMember";
import EventsListView from "../../views/EventsListView";

const LoggedRouter = () => {
    /* Remember to add "exact" to allow users to type the endpoint directly. */
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<ReportsListView/>} />

                <Route exact path={LOG_IN_PATH} element={<SignInSide />} />

                <Route exact path={REPORTS_PATH} element={<ReportsListView/>}/>

                <Route exact path={EVENTS_PATH} element={<EventsListView/>}/>

                <Route exact path={EVENT_CREATE_PATH} element={<CreateEventView/>}/>

                <Route exact path={EVENT_VIEW_PATH} element={<ViewEventView/>}/>

                <Route exact path={ADD_TO_GROUP_PATH} element={<AddGroupMember/>}/>
            </Routes>
        </div>
    );
};

export {
    LoggedRouter
};

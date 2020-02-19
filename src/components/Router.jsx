import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    NavLink,
    Link
} from "react-router-dom";
import {TimeSheets} from './ViewTimesheets/viewTimesheets'
import {ManageUsers} from './AdminHome/ManageUsers'
export default ((props) => {
    return (
        <div>
            <BrowserRouter>
                <Link to="/viewTimesheets">ViewTimesheets</Link>
                <br/>
                <Link to="/">Home</Link>
                <Switch>
                    <Route path="/viewTimesheets">
                        <TimeSheets username="user1"/>
                    </Route>
                    <Route exact path="/">
                        <ManageUsers />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
})
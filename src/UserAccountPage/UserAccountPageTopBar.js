import { React } from "react";
import LeaveAccountPage from "./LeaveAccountPage";

function UserAccountPageTopBar(props) {
    return (
        <div className="top-bar" id="user-account-top-bar">
            <div className="top-bar-content">
                <LeaveAccountPage
                    onChangePage={props.onChangePage}
                    prevPage={props.prevPage}
                />
                <h2>Your Account</h2>
            </div>
        </div>
    );
}
export default UserAccountPageTopBar;

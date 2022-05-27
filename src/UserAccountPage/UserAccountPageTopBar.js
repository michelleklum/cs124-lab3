import { React } from "react";
import LeaveAccountPage from "./LeaveAccountPage";

function UserAccountPageTopBar(props) {
    return (
        <div className="top-bar">
            <div className="user-account-top-bar-content">
                <LeaveAccountPage
                    onChangePage={props.onChangePage}
                    prevPage={props.prevPage}
                    isLargeScreen={props.isLargeScreen}
                    onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
                />
                <h2>Your Account</h2>
            </div>
        </div>
    );
}
export default UserAccountPageTopBar;

import React, { useState } from "react";
import "./UserAccountPage.css";
import UserAccountPageTopBar from "./UserAccountPageTopBar";
import ChangePasswordButton from "./ChangePasswordButton";
import SignOutButton from "./SignOutButton";
import UsageAlert from "../Global/UsageAlert";

function UserAccountPage(props) {
  const [showChangePasswordWarning, setShowChangePasswordWarning]
    = useState(false);

  function handleToggleUsageAlert() {
    setShowChangePasswordWarning(!showChangePasswordWarning);
  }

  return (
    <div id="user-account-page">
      <div className="top-bar">
        <UserAccountPageTopBar
          onChangePage={props.onChangePage}
          prevPage={props.prevPage}
          isLargeScreen={props.isLargeScreen}
          onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
        />
      </div>
      <div className="account-page-content">
        <div className="account-content-box">
          <h3 className="account-header">Email</h3>
          <h3 className="user-email">{props.user.email}</h3>
          <h3 className="account-header">Password</h3>
        </div>
        <ChangePasswordButton
          onToggleUsageAlert={handleToggleUsageAlert} />
        <SignOutButton
          user={props.user}
          auth={props.auth}
          onChangePage={props.onChangePage}
          onChangeList={props.onChangeList}
          onChangeTask={props.onChangeTask} />
      </div>
      {showChangePasswordWarning ? (<UsageAlert
        usageErrorMessage="Are you sure you want to change your password?"
        onToggleUsageAlert={handleToggleUsageAlert}
        confirmChangePassword={true}
        user={props.user}
        onChangePage={props.onChangePage}
        onChangeList={props.onChangeList}
        onChangeTask={props.onChangeTask}
        auth={props.auth} />)
        : null
      }
    </div>
  );
}

export default UserAccountPage;


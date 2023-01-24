import React, { useState } from "react";
import "./UserAccountPage.css";
import UserAccountPageTopBar from "./UserAccountPageTopBar";
import ChangePasswordButton from "./ChangePasswordButton";
import SignOutButton from "./SignOutButton";
import UsageAlert from "../Global/UsageAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";


function UserAccountPage(props) {
  const [showChangePasswordWarning, setShowChangePasswordWarning]
    = useState(false);

  const [showSignOutWarning, setShowSignOutWarning]
    = useState(false);


  function handleTogglePasswordUsageAlert() {
    setShowChangePasswordWarning(!showChangePasswordWarning);
  }

  function handleToggleSignOutUsageAlert() {
    setShowSignOutWarning(!showSignOutWarning);
  }

  const isPasswordUser = props.user.providerData[0].providerId === "password";
  const isGoogleUser = props.user.providerData[0].providerId === "google.com";

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
          {isPasswordUser && <h3 className="account-header">Password</h3>}
        </div>
        {isGoogleUser && <div className="google-sign-in">
          <FontAwesomeIcon className="google-icon account-page-google-icon" icon={faGoogle} />
          <h3 className="google-sign-in-text">Signed in with Google</h3>
        </div>}
        {isPasswordUser && <ChangePasswordButton
          onToggleUsageAlert={handleTogglePasswordUsageAlert} />}
        <SignOutButton
          onToggleUsageAlert={handleToggleSignOutUsageAlert} />
      </div>
      {showChangePasswordWarning ? (<UsageAlert
        usageErrorMessage="Are you sure you want to change your password?"
        onToggleUsageAlert={handleTogglePasswordUsageAlert}
        confirmChangePassword={true}
        user={props.user}
        onChangePage={props.onChangePage}
        onChangeList={props.onChangeList}
        onChangeTask={props.onChangeTask}
        auth={props.auth} />)
        : null
      }
      {showSignOutWarning ? (<UsageAlert
        usageErrorMessage="Are you sure you want to sign out?"
        onToggleUsageAlert={handleToggleSignOutUsageAlert}
        confirmSignOut={true}
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


import "./UsageAlert.css";
import { signOut } from "firebase/auth";
import React, { Fragment } from "react";
import FocusTrap from "focus-trap-react";

function UsageAlert(props) {
  return (
    <FocusTrap>
      <div className="backdrop">
        <div className="usage-alert">
          <h3 className="usage-alert-description">{props.usageErrorMessage}</h3>
          <div className="usage-alert-buttons">
            {!(props.includeChangePassword | props.signInMessage
              | props.confirmChangePassword | props.confirmSignOut) &&
              <Fragment>
                <button
                  className="usage-alert-button usage-alert-cancel"
                  type="button"
                  onClick={() => props.onToggleUsageAlert()}
                  aria-label="Got it"
                >
                  Got it
                </button>
              </Fragment>}
            {(props.includeChangePassword && props.signInMessage) &&
              <Fragment>
                <button
                  className="usage-alert-button usage-alert-sign-in"
                  type="button"
                  onClick={() => {
                    props.onChangePage("SignInPage");
                    props.onToggleUsageAlert()
                  }}
                  aria-label="Sign in"
                >
                  {props.signInMessage}
                </button>
                <button
                  className="usage-alert-button usage-alert-change-password"
                  type="button"
                  onClick={() => props.onChangePage("ResetPasswordPage")}
                  aria-label="Change password"
                >
                  Reset password
                </button>
              </Fragment>}
            {props.confirmChangePassword &&
              <Fragment>
                <button
                  className="usage-alert-button usage-alert-sign-in"
                  type="button"
                  onClick={() => props.onToggleUsageAlert()}
                  aria-label="Cancel"
                >
                  Cancel
                </button>
                <button
                  className="usage-alert-button usage-alert-change-password"
                  type="button"
                  onClick={() => {
                    props.onChangeList(null);
                    props.onChangeTask(null);
                    signOut(props.auth).then(() => props.onChangePage("ResetPasswordPage"));
                  }}
                  aria-label="Change password"
                >
                  Change password
                </button>
              </Fragment>}
            {props.confirmSignOut &&
              <Fragment>
                <button
                  className="usage-alert-button usage-alert-sign-in"
                  type="button"
                  onClick={() => props.onToggleUsageAlert()}
                  aria-label="Cancel"
                >
                  Cancel
                </button>
                <button
                  className="usage-alert-button usage-alert-change-password"
                  type="button"
                  onClick={() => {
                    props.onChangePage("SignInPage");
                    props.onChangeList(null);
                    props.onChangeTask(null);
                    signOut(props.auth);;
                  }}
                  aria-label="Sign Out"
                >
                  Sign Out
                </button>
              </Fragment>}
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default UsageAlert;

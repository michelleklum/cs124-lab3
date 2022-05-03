import { React, useState, useEffect, Fragment } from "react";
import "./ResetPasswordPage.css";
import UsageAlert from "../Global/UsageAlert";
import {
  useSendPasswordResetEmail,
} from "react-firebase-hooks/auth";


function ResetPasswordPage(props) {
  const [sendPasswordResetEmail, sending, emailError] =
    useSendPasswordResetEmail(props.auth);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailSendAttempted, setEmailSendAttempted] = useState(false);
  const [showUsageAlert, setShowUsageAlert] = useState(false);

  function handleToggleUsageAlert() {
    setShowUsageAlert(!showUsageAlert);
  }

  const errorMessage = emailError
    ? (emailError.message.includes("missing-email")
      | emailError.message.includes("invalid-email"))
      ? "Please enter a valid email."
      : emailError.message.includes("user-not-found")
        ? "No user found with this email address."
        : emailError.message
    : "";

  useEffect(() => {
    sending && setEmailSendAttempted(true);
  }, [sending]);

  useEffect(() => {
    if (!sending && emailSendAttempted) {
      (emailError && setShowUsageAlert(true));
      (!emailError) && setEmailSent(true);
    };
  }, [sending, emailSendAttempted, emailError]);


  return (
    <Fragment>
      {!emailSent ?
        <div id="authentication-page">
          <img
            src={require("../Global/logo_task_monster.png")}
            alt="Task Monster Logo"
            className="welcome-logo-log-in"
          />
          <br />
          <h2 className="authentication-header">Reset Password</h2>
          <div className="email-password">
            <div className="auth-input">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email address"
                aria-label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <button
            className="reset-password-send-link auth-button"
            aria-label="Send password reset link"
            onClick={() => {
              sendPasswordResetEmail(email);
            }}
          >
            <h3 className="sign-in-text">Send me a password reset link!</h3>
          </button>
          <button
            className="auth-button auth-button"
            aria-label="Return to sign in"
            onClick={() => props.onChangePage("SignInPage")}
          >
            <h3 className="sign-in-text">Return to sign in</h3>
          </button>
          {emailError && showUsageAlert ? (<UsageAlert
            usageErrorMessage={errorMessage}
            onToggleUsageAlert={handleToggleUsageAlert} />)
            : null
          }
        </div >
        :
        <div id="authentication-page">
          <img
            src={require("../Global/logo_task_monster.png")}
            alt="Task Monster Logo"
            className="welcome-logo-log-in"
          />
          <br />
          <h2 className="authentication-header">Reset Password</h2>
          <h3 className="link-sent">
            A link to reset your password has been sent to {email}.
          </h3>
          <button
            className="auth-button auth-button"
            aria-label="Return to sign in"
            onClick={() => props.onChangePage("SignInPage")}
          >
            <h3 className="sign-in-text">Return to sign in</h3>
          </button>
        </div >
      }

    </Fragment>

  );
}

export default ResetPasswordPage;

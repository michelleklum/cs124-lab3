import { React, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import EmailPasswordInputFields from "./EmailPasswordInputFields";
import UsageAlert from "../Global/UsageAlert";

function SignUpPage(props) {
  const useCreateUserEmail = useCreateUserWithEmailAndPassword(props.auth);
  const createUserWithEmailAndPassword = useCreateUserEmail[0];
  const error = useCreateUserEmail[3];
  const [showUsageAlert, setShowUsageAlert] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleToggleUsageAlert() {
    setShowUsageAlert(!showUsageAlert);
  }

  function handleChangePageAfterSignUp() {
    if (props.user) {
      setEmail("");
      setPassword("");
      props.onChangePage("Home");
    } else {
      handleToggleUsageAlert();
    }
  }

  const includeChangePassword = error
  ? (error.message.includes("email-already-in-use")
    ? true
    : false) : false;

  const errorMessage = error
    ? error.message.includes("internal-error")
      ? "Please enter a valid email and password."
      : error.message.includes("invalid-email")
      ? "Please enter a valid email."
      : error.message.includes("weak-password")
      ? "Password must be at least 6 characters."
      : error.message.includes("email-already-in-use")
      ? "This account is already taken. If this is your account, "
        + "sign in instead. Not your account? Reset your password."
      : "We've encountered an error logging you in. Try again."
    : "";

  return (
    <div id="authentication-page">
      <img
        src={require("../Global/logo_task_monster.png")}
        alt="Task Monster Logo"
        className="welcome-logo-log-in"
      />
      <br />
      <h2 className="authentication-header">Sign Up</h2>
      <EmailPasswordInputFields
        email={email}
        password={password}
        onChangeEmail={setEmail}
        onChangePassword={setPassword}
        signInPage={false}
      />
      <button
        className="auth-button main-auth-button sign-up-button"
        aria-label="Sign Up"
        onClick={() => {
          createUserWithEmailAndPassword(email, password).then(
            handleChangePageAfterSignUp()
          );
        }}
      >
        <h3>Sign Up!</h3>
      </button>
      <hr className="auth-line" />
      <div className="sign-up-text">
        <div>
          <p>Already have an account?&nbsp;</p>
        </div>
        <div>
          <button onClick={() => props.onChangePage("SignInPage")}>
            <h3>Sign In</h3>
          </button>
        </div>
      </div>
      {error && showUsageAlert ? (
        <UsageAlert
          usageErrorMessage={errorMessage}
          onToggleUsageAlert={handleToggleUsageAlert}
          includeChangePassword = {includeChangePassword}
          signInMessage = "Sign in"
          onChangePage={props.onChangePage}
        />
      ) : null}
    </div>
  );
}

export default SignUpPage;

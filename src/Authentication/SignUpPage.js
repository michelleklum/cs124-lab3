import { React, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import EmailPasswordInputFields from "./EmailPasswordInputFields";
import UsageAlert from "../Global/UsageAlert";

function SignUpPage(props) {
  const [createUserWithEmailAndPassword, error] =
    [useCreateUserWithEmailAndPassword(props.auth)[0],
     useCreateUserWithEmailAndPassword(props.auth)[3]];
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
    }
    else {
      handleToggleUsageAlert()
    }
  }

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
        onChangePassword={setPassword} />
      <button
        className="sign-in-sign-up-button main-auth-button sign-up-button"
        aria-label="Sign Up"
        onClick={() => {
          createUserWithEmailAndPassword(email, password)
            .then(handleChangePageAfterSignUp());
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
          <button
            onClick={() => props.onChangePage("SignInPage")}>
            <h3>
              Sign In
            </h3>
          </button>
        </div>
      </div>
      {error && showUsageAlert ? (<UsageAlert
        usageErrorMessage={error.message}
        onToggleUsageAlert={handleToggleUsageAlert} />)
        : null
      }
    </div>
  );
}

export default SignUpPage;

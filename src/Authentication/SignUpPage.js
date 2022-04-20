import { React, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import EmailPasswordInputFields from "./EmailPasswordInputFields";

function SignUpPage(props) {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(props.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          createUserWithEmailAndPassword(email, password);
          setEmail("");
          setPassword("");
          props.onChangePage("Home");
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
    </div>
  );
}

export default SignUpPage;

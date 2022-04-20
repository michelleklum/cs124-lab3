import { React, useState } from "react";
import SignInOptions from "./SignInOptions";

function SignInPage(props) {
  return (
    <div id="authentication-page">
      <img
        src={require("../Global/logo_task_monster.png")}
        alt="Task Monster Logo"
        className="welcome-logo-log-in"
      />
      <br />
      <h2 className="authentication-header">Sign In</h2>
      <SignInOptions
        onChangePage={props.onChangePage}
        auth={props.auth} />
      <hr className="auth-line" />
      <div className="sign-up-text">
        <div>
          <p>Don't have an account?&nbsp;</p>
        </div>
        <div>
          <button
          onClick={() => props.onChangePage("SignUpPage")}>
          <h3>
            Sign Up
          </h3>
        </button>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;

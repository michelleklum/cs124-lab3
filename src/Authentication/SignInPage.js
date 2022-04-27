import { React, useState } from "react";
import SignInOptions from "./SignInOptions";
import UsageAlert from "../Global/UsageAlert";
import {
  useSignInWithGoogle,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";

function SignInPage(props) {
  // State and functions below handle alerts and warnings
  const useGoogleSignIn = useSignInWithGoogle(props.auth);
  const signInWithGoogle = useGoogleSignIn[0];
  const googleError = useGoogleSignIn[3];

  const useEmailSignIn = useSignInWithEmailAndPassword(props.auth);
  const signInWithEmailAndPassword = useEmailSignIn[0];
  const emailError = useEmailSignIn[3];
  
  const [showUsageAlert, setShowUsageAlert] = useState(false);

  function handleToggleUsageAlert() {
    setShowUsageAlert(!showUsageAlert);
  }

  console.log(emailError)
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
        auth={props.auth}
        user={props.user}
        signInWithGoogle={signInWithGoogle}
        signInWithEmailAndPassword={signInWithEmailAndPassword}
        emailError={emailError}
        googleError={googleError} 
        onToggleUsageAlert={handleToggleUsageAlert}/>
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
      {emailError && showUsageAlert ? (<UsageAlert
        usageErrorMessage={emailError.message}
        onToggleUsageAlert={handleToggleUsageAlert} />)
        : googleError && showUsageAlert ? (
          <UsageAlert
            usageErrorMessage={emailError.message}
            onToggleUsageAlert={handleToggleUsageAlert} />)
          : null
      }
    </div>
  );
}

export default SignInPage;

import { React, useState } from "react";
import {
  useSignInWithGoogle,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import EmailPasswordInputFields from "./EmailPasswordInputFields";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

function SignInOptions(props) {
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(props.auth);
  const [signInWithEmailAndPassword, emailUser, emailLoading, emailError] =
    useSignInWithEmailAndPassword(props.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    !googleUser &&
    !googleLoading &&
    !googleError &&
    !emailUser &&
    !emailLoading &&
    !emailError && (
      <div id="sign-in-options">
        <EmailPasswordInputFields
          email={email}
          password={password}
          onChangeEmail={setEmail}
          onChangePassword={setPassword}
        />
        <button
          className="sign-in-sign-up-button main-auth-button"
          aria-label="Sign In With Email and Password"
          onClick={() => {
            signInWithEmailAndPassword(email, password);
            props.onChangePage("Home");
          }}
        >
          <h3 className="sign-in-text">Sign In</h3>
        </button>
        <button
          className="sign-in-sign-up-button"
          aria-label="Sign In With Google"
          onClick={() => signInWithGoogle()}
        >
          <FontAwesomeIcon className="google-icon" icon={faGoogle} />
          <h3 className="sign-in-text">Sign In With Google</h3>
        </button>
      </div>
    )
  );
}

export default SignInOptions;

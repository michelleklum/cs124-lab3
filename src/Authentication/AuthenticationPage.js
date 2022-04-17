import { React, useState } from "react";
import {
  useSignInWithGoogle,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";

function AuthenticationPage(props) {
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(props.auth);
  const [signInWithEmailAndPassword, emailUser, emailLoading, emailError] =
    useSignInWithEmailAndPassword(props.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <div>
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="text"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="sign-up-button"
          aria-label="Sign Up"
          onClick={() => props.onChangePage("SignUpPage")}
        >
          <h3 className="sign-up-text">Sign Up</h3>
        </button>
      </div>
      <button
        className="sign-in-button"
        aria-label="Sign In With Email and Password"
        onClick={() => {
          signInWithEmailAndPassword(email, password);
          props.onChangePage("Home");
        }}
      >
        <h3 className="sign-in-text">Sign In</h3>
      </button>
      <button
        className="sign-in-button"
        aria-label="Sign In With Google"
        onClick={() => signInWithGoogle()}
      >
        <h3 className="sign-in-text">Sign In With Google</h3>
      </button>
    </div>
  );
}

export default AuthenticationPage;

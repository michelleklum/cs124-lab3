import { React, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

function SignUpPage(props) {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(props.auth);

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
          className="confirm-sign-up-button"
          aria-label="Sign Up"
          onClick={() => {
            createUserWithEmailAndPassword(email, password);
            setEmail("");
            setPassword("");
            props.onChangePage("Home");
          }}
        >
          <h3 className="confirm-sign-up-text">
            Sign Up! (this will eventually look like a confirm button)
          </h3>
        </button>
      </div>
    </div>
  );
}

export default SignUpPage;

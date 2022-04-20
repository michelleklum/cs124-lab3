import { React, useState } from "react";
import EmailPasswordInputFields from "./EmailPasswordInputFields";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"

function SignInOptions(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleChangePageAfterSignIn() {
        if (props.user) {
            props.onChangePage("Home")
        }
        else {
            props.onToggleUsageAlert()
        }
    }

    return (
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
                onClick={() => props.signInWithEmailAndPassword(email, password)
                    .then(handleChangePageAfterSignIn())}
            >
                <h3 className="sign-in-text">Sign In</h3>
            </button>
            <button
                className="sign-in-sign-up-button"
                aria-label="Sign In With Google"
                onClick={() => props.signInWithGoogle().then(handleChangePageAfterSignIn())}
            >
                <FontAwesomeIcon className="google-icon" icon={faGoogle} />
                <h3 className="sign-in-text">Sign In With Google</h3>
            </button>
        </div >
    );
}

export default SignInOptions;

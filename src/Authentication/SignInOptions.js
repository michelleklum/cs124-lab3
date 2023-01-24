import { React, useState } from "react";
import EmailPasswordInputFields from "./EmailPasswordInputFields";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

function SignInOptions(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleChangePageAfterEmailSignIn() {
        if (props.user) {
            props.onChangePage("Home")
        }
        else {
            props.onToggleEmailUsageAlert()
        }
    }

    function handleChangePageAfterGoogleSignIn() {
        if (props.user) {
            props.onChangePage("Home")
        }
        else {
            props.onToggleGoogleUsageAlert()
        }
    }

    return (
        <div id="sign-in-options">
            <EmailPasswordInputFields
                email={email}
                password={password}
                onChangeEmail={setEmail}
                onChangePassword={setPassword}
                signInPage={true}
                onChangePage={props.onChangePage}
            />
            <button
                className="auth-button main-auth-button"
                aria-label="Sign In With Email and Password"
                onClick={() => props.signInWithEmailAndPassword(email, password)
                    .then(handleChangePageAfterEmailSignIn())}
            >
                <h3 className="sign-in-text">Sign In</h3>
            </button>
            <button
                className="auth-button"
                aria-label="Sign In With Google"
                onClick={() => props.signInWithGoogle().then(handleChangePageAfterGoogleSignIn())}
            >
                <FontAwesomeIcon className="google-icon" icon={faGoogle} />
                <h3 className="sign-in-text">Sign In With Google</h3>
            </button>
        </div >
    );
}

export default SignInOptions;

import { React, useState } from "react";

function EmailPasswordInputFields(props) {
    const [showPassword, setShowPassword] = useState(false);
    const passwordType = showPassword ? "do-not-show-password" : "password"

    return (
        <div className="email-password">
            <div className="auth-input">
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    aria-label="Email Address"
                    value={props.email}
                    onChange={(e) => props.onChangeEmail(e.target.value)}
                />
            </div>
            <div className="auth-input">
                <input
                    type={passwordType}
                    id="password"
                    name="password"
                    aria-label="Password"
                    placeholder="Password"
                    value={props.password}
                    onChange={(e) => props.onChangePassword(e.target.value)}
                    autoComplete="off"
                />
            </div>
            <div className="password-options">
                <div className="show-password">
                    <input type="checkbox"
                        id="show-password"
                        name="show-password" 
                        className="show-password-checkbox" 
                        aria-label="Show password?"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}/>
                    <p id="show-password-label">Show password</p>
                </div>
                {props.signInPage && <div>
                    <button
                        onClick={() => props.onChangePage("ResetPasswordPage")}
                        aria-label="Forgot your password?">
                        <p id="forgot-password">Forgot password? </p>
                    </button>
                </div>}
            </div>
        </div>
    );
}

export default EmailPasswordInputFields;

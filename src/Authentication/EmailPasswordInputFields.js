function EmailPasswordInputFields(props) {
    return (
        <div className="email-password">
            <div className="auth-input">
                <input
                    type="text"
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
                    type="text"
                    id="password"
                    name="password"
                    aria-label="Password"
                    placeholder="Password"
                    value={props.password}
                    onChange={(e) => props.onChangePassword(e.target.value)}
                />
            </div>
        </div>
    );
}

export default EmailPasswordInputFields;

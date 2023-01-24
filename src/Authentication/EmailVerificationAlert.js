import "./EmailVerificationAlert.css";
import FocusTrap from "focus-trap-react";
import { sendEmailVerification, signOut } from "firebase/auth";

function EmailVerificationAlert(props) {
  return (
    <FocusTrap>
      <div className="backdrop">
        <div className="verify-email-alert">
          <h3 className="verify-email-alert-description">
            You must verify your email to use Task Monster. After verifying your email, sign in
            with your account!
          </h3>
          <div className="verify-email-alert-buttons">
            <button
              className="verify-email-alert-button"
              type="button"
              onClick={() => {
                sendEmailVerification(props.user);
                // Must sign user out because request.auth.token.email_verified token referenced in security rules will not update until user signs out.
                // If you do not sign user out, Firebase will give permissions error.
                signOut(props.auth);
              }}
              aria-label="Send verification email"
            >
              Send verification email
            </button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default EmailVerificationAlert;

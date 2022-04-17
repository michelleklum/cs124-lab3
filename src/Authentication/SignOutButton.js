import { signOut } from "firebase/auth";

function SignOutButton(props) {
  return (
    <button
      className="confirm-sign-out-button"
      aria-label="Sign Out"
      onClick={() => {
        props.onChangePage("AuthenticationPage");
        signOut(props.auth);
      }}
    >
      <h3 className="confirm-sign-up-text">Sign Out</h3>
    </button>
  );
}

export default SignOutButton;

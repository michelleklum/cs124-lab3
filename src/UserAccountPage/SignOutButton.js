function SignOutButton(props) {
  return (
    <button
      className="sign-out-button"
      aria-label="Sign Out"
      onClick={() => props.onToggleUsageAlert()}
    >
      <h3 className="confirm-sign-up-text">Sign Out</h3>
    </button>
  );
}

export default SignOutButton;

function ChangePasswordButton(props) {
  return (
    <button
      className="change-password-button"
      aria-label="ChangePassword"
      onClick={() => props.onToggleUsageAlert()}
    >
      <h3 className="change-password-text">Change Password</h3>
    </button>
  );
}

export default ChangePasswordButton;

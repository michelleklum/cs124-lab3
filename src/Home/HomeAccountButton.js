import "./HomeAccountButton.css";

function HomeAccountButton(props) {
  return (
    <button
      onClick={() => {
        props.onChangePage("UserAccountPage");
        props.isLargeScreen && props.onToggleLargeScreenPopup();
      }}
      aria-label="Open User Account">
      <i
        className="account-button fas fa-user fa-4x"
      ></i>
    </button>
  );
}

export default HomeAccountButton;

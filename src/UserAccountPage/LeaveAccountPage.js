function LeaveAccountPage(props) {
  function handleOnClick() {
    props.onChangePage(props.prevPage);
    if (props.isLargeScreen) {
      props.onToggleLargeScreenPopup();
    }
  }

  return (
    <button
      className="leave-account-page-button left-aligned"
      onClick={handleOnClick}
      aria-label={"Return Home"}>
      <i
        className="fas fa-chevron-left fa-5x leave-account-page"
      ></i>
    </button>
  );
}

export default LeaveAccountPage;

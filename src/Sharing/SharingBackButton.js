function SharingBackButton(props) {
  function handleOnClick() {
    props.onChangePage(props.prevPage);
    if (props.isLargeScreen) {
      props.onToggleLargeScreenPopup();
    }
  }

  return (
    <button
      className="sharing-back-button"
      onClick={handleOnClick}
      aria-label={"Exit list sharing settings"}
    >
      <i className="fas fa-chevron-left fa-4x"></i>
    </button>
  );
}

export default SharingBackButton;

function CancelEditListButton(props) {
  function handleOnClick() {
    props.onChangePage(props.prevPage);
    if (props.isLargeScreen) {
      props.onToggleLargeScreenPopup();
    }
  }

  return (
    <button
      className="cancel-edit-list-button left-aligned"
      onClick={handleOnClick}
      aria-label={"Cancel editing list"}>
      <i
        className="fas fa-times fa-5x cancel-edit-list"
      ></i>
    </button>
  );
}

export default CancelEditListButton;

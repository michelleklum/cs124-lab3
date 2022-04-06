function CancelEditListButton(props) {

  function handleOnClick() {
    props.onChangePage(props.prevPage);
    props.isLargeScreen && props.onToggleLargeScreenPopup();
  }

  return (
    <div className="left-aligned">
      <i
        className="fas fa-times fa-5x cancel-edit-list"
        onClick={handleOnClick}
        aria-label={"Cancel editing list"}
        tabIndex="0"
        role="button"
        onKeyDown={(e) => (e.code === "Enter") ? handleOnClick() : null}
      ></i>
    </div>
  );
}

export default CancelEditListButton;

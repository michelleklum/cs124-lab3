function LargeScreenAddButton(props) {
  function handleClick() {
    if (props.addType === "list") {
      props.onChangePage("CreateListPage");
    } else {
      props.onChangePage("CreateTaskPage");
    }
    props.onToggleLargeScreenPopup();
  }

  return (
    <button
      className="large-screen-add-button"
      onClick={handleClick}
      aria-label={`Create new ${props.addType}`}
    >
      <i className="fas fa-plus fa-4x"></i>
    </button>
  );
}

export default LargeScreenAddButton;

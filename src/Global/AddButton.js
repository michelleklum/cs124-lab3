import "./AddButton.css";

function AddButton(props) {

  function handleClick() {
    (props.currentPage === "Home") ? props.onChangePage("CreateListPage")
      : props.onChangePage("CreateTaskPage")
  }

  return (
    <div className="add-button"
      onClick={handleClick}
      aria-label={props.addLabel}
      tabIndex="0"
      role="button"
      onKeyDown={(e) => (e.code === "Enter") ? handleClick() : null}
    >
      <i className="fas fa-plus fa-4x"></i>
    </div>
  );
}

export default AddButton;

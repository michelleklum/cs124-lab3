import "./AddButton.css";

function AddButton(props) {

  function handleClick() {
    (props.currentPage === "Home") ? props.onChangePage("CreateListPage")
      : props.onChangePage("CreateTaskPage")
  }

  return (
    <button className="add-button"
      onClick={handleClick}
      aria-label={props.addLabel}
    >
      <i className="fas fa-plus fa-4x"></i>
    </button>
  );
}

export default AddButton;

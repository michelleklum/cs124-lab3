import "./DeleteListButton.css";

function DeleteListButton(props) {
  function handleDeleteList() {
    props.onChangeList(props.id);
    props.onToggleDeleteAlert();
  }

  return (
    <button
      className="delete-list-button"
      aria-label="Delete list"
      onClick={handleDeleteList}>
      <i
        className="fas fa-trash-alt fa-4x delete-list right-aligned"
      ></i>
    </button>
  );
}

export default DeleteListButton;

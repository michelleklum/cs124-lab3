import "./DeleteListButton.css";

function DeleteListButton(props) {
  function handleDeleteList() {
    props.onChangeList(props.id);
    props.onToggleDeleteAlert();
  }

  return (
    <i
      className="fas fa-trash-alt fa-4x delete-list right-aligned"
      aria-label = "Delete list"
      tabIndex="0"
      role="button"
      onKeyDown={(e) => (e.code === "Enter") ? handleDeleteList() : null}
      onClick={handleDeleteList}
    ></i>
  );
}

export default DeleteListButton;

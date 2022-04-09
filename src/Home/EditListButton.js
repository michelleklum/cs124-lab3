import "./EditListButton.css";

function EditListButton(props) {
  function handleEditList(newPage) {
    props.onChangeList(props.id);
    props.onChangePage(newPage);
  }
  return (
    <button
      className="edit-list-button"
      onClick={() => handleEditList("EditListPage")}
      aria-label="Edit List">
      <i
        className="fas fa-pencil-alt fa-4x edit-list right-aligned"
      ></i>

    </button>
  );
}

export default EditListButton;

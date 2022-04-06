import "./EditListButton.css";

function EditListButton(props) {
  function handleEditList(newPage) {
    props.onChangeList(props.id);
    props.onChangePage(newPage);
  }
  return (
    <i
      className="fas fa-pencil-alt fa-4x edit-list right-aligned"
      onClick={() => handleEditList("EditListPage")}
      aria-label = "Edit List"
      role="button"
      tabIndex="0"
      onKeyDown={(e) => (e.code === "Enter") ? handleEditList("EditListPage") : null}
    ></i>
  );
}

export default EditListButton;

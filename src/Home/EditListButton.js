import "./EditListButton.css";

function EditListButton(props) {
  function handleEditList(newPage) {
    props.onChangeList(props.id);
    props.onChangePage(newPage)
  }
  return (
    <i
      className="fas fa-pencil-alt fa-4x edit-list"
      onClick={() => handleEditList("EditListPage")}
    ></i>
  );
}

export default EditListButton;

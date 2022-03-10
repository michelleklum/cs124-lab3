function DeleteListBarFromEditPage(props) {
  return (
    <div
      className="delete-toolbar"
      onClick={() => props.onToggleDeleteAlert()}
    >
      <i className="fas fa-trash-alt fa-4x trash"></i>
    </div>
  );
}

export default DeleteListBarFromEditPage;

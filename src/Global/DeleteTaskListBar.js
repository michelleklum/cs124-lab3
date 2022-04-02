import "./DeleteTaskListBar.css";

function DeleteTaskListBar(props) {
  return (
    <div className="delete-bar" onClick={() => props.onToggleDeleteAlert()}>
      <i className="fas fa-trash-alt fa-4x trash"></i>
    </div>
  );
}

export default DeleteTaskListBar;

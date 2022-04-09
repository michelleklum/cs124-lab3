import "./DeleteTaskListBar.css";

function DeleteTaskListBar(props) {
  return (
    <button
      className="delete-bar"
      onClick={() => props.onToggleDeleteAlert()}
      aria-label="Delete">
      <i className="fas fa-trash-alt fa-4x trash"></i>
    </button>
  );
}

export default DeleteTaskListBar;

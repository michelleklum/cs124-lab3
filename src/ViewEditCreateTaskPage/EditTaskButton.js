function EditTaskButton(props) {
  function handleClick() {
    props.onChangePage("EditTaskPage");
  }

  return (
    <button
      className="edit-task-button"
      onClick={handleClick}
      aria-label={`Edit current task: ${props.tempTaskName}`}
    >
      <i className="fas fa-pencil-alt fa-4x"></i>
    </button>
  );
}

export default EditTaskButton;

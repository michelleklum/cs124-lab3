function SaveTaskButton(props) {
  function confirmEditTask() {
    props.onEditAllTaskFields(
      props.currentListId,
      props.currentTaskId,
      props.taskName,
      props.taskDate,
      props.taskTime,
      props.taskNotes,
      props.taskStatus
    );
  }

  function confirmCreateTask() {
    props.onCreateTask(
      props.currentListId,
      props.taskName,
      props.taskDate,
      props.taskTime,
      props.taskNotes
    );
  }

  return (
    <div>
      {props.inEditTaskMode && props.taskName !== "" && (
        <i className="fas fa-check fa-4x" onClick={() => confirmEditTask()}></i>
      )}
      {props.inEditTaskMode && props.taskName === "" && (
        <i className="fas fa-check fa-4x" id="no-info"></i>
      )}
      {props.inCreateTaskMode && props.taskName !== "" && (
        <i
          className="fas fa-check fa-4x"
          onClick={() => confirmCreateTask()}
        ></i>
      )}
      {props.inCreateTaskMode && props.taskName === "" && (
        <i className="fas fa-check fa-4x" id="no-info"></i>
      )}
    </div>
  );
}

export default SaveTaskButton;

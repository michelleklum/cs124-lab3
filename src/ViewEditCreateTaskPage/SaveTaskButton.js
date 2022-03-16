import React, { useState } from "react";

function SaveTaskButton(props) {
  const [confirmInProgress, setConfirmInProgress] = useState(false);

  function confirmEditTask() {
    setConfirmInProgress(true);
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
    setConfirmInProgress(true);
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
      {confirmInProgress && (
        <i className="fas fa-check fa-4x" id="no-info"></i>
      )}
      {!confirmInProgress && props.inEditTaskMode && props.taskName !== "" && (
        <i className="fas fa-check fa-4x" onClick={() => confirmEditTask()}></i>
      )}
      {!confirmInProgress && props.inEditTaskMode && props.taskName === "" && (
        <i className="fas fa-check fa-4x" id="no-info"></i>
      )}
      {!confirmInProgress && props.inCreateTaskMode && props.taskName !== "" && (
        <i
          className="fas fa-check fa-4x"
          onClick={() => confirmCreateTask()}
        ></i>
      )}
      {!confirmInProgress && props.inCreateTaskMode && props.taskName === "" && (
        <i className="fas fa-check fa-4x" id="no-info"></i>
      )}
    </div>
  );
}

export default SaveTaskButton;

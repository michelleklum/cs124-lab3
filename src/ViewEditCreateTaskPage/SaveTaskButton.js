import React, { useState } from "react";

function SaveTaskButton(props) {
  const [confirmInProgress, setConfirmInProgress] = useState(false);

  function confirmEditTask() {
    setConfirmInProgress(true);
    props.onEditAllTaskFields(
      props.currentListId,
      props.currentTaskId,
      props.tempTaskName,
      props.tempTaskDeadline,
      props.tempTaskNotes,
      props.tempTaskStatus,
      props.tempTaskPriority
    );
    props.isLargeScreen && props.onToggleLargeScreenPopup();
  }

  function confirmCreateTask() {
    setConfirmInProgress(true);
    props.onCreateTask(
      props.currentListId,
      props.tempTaskName,
      props.tempTaskDeadline,
      props.tempTaskNotes,
      props.tempTaskPriority
    );
    props.isLargeScreen && props.onToggleLargeScreenPopup();
  }

  return (
    <div>
      {confirmInProgress && <i className="fas fa-check fa-4x" id="no-info"></i>}
      {!confirmInProgress && props.inEditTaskMode && props.tempTaskName !== "" && (
        <button
          onClick={confirmEditTask}
          aria-label={`Save changes to current task: ${props.tempTaskName}`}
        >
          <i className="fas fa-check fa-4x"></i>
        </button>
      )}
      {!confirmInProgress &&
        props.inEditTaskMode &&
        props.tempTaskName === "" && (
          <i className="fas fa-check fa-4x" id="no-info"></i>
        )}
      {!confirmInProgress &&
        props.inCreateTaskMode &&
        props.tempTaskName !== "" && (
          <button
            onClick={confirmCreateTask}
            aria-label={`Create new task: ${props.tempTaskName}`}
          >
            <i className="fas fa-check fa-4x"></i>
          </button>
        )}
      {!confirmInProgress &&
        props.inCreateTaskMode &&
        props.tempTaskName === "" && (
          <i className="fas fa-check fa-4x" id="no-info"></i>
        )}
    </div>
  );
}

export default SaveTaskButton;

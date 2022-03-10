import React, { Fragment } from "react";

function DeleteAllTasks(props) {
  return (
    <Fragment>
      <i
        className="fas fa-dumpster delete-all-icon"
        onClick={() => props.onToggleDeleteTasksAlert()}
      ></i>
      <h2
        className="delete-all-desc"
        onClick={() => props.onToggleDeleteTasksAlert()}
      >
        Delete all tasks
      </h2>
    </Fragment>
  );
}

export default DeleteAllTasks;

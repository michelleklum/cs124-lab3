import React, { Fragment } from "react";

function DeleteAllTasksBar(props) {
  function handleClick() {
    props.onToggleDeleteTasksAlert();
  }

  return (
    <Fragment>
      <button
        className="menu-icon-button delete-all-icon"
        onClick={handleClick}
        aria-label={`Delete all tasks in current list: ${props.taskList.name}`}
      >
        <i className="fas fa-dumpster"></i>
      </button>
      <button
        className="delete-all-desc"
        onClick={handleClick}
        aria-label={`Delete all tasks in current list: ${props.taskList.name}`}
      >
        <h2>Delete all tasks</h2>
      </button>
    </Fragment>
  );
}

export default DeleteAllTasksBar;

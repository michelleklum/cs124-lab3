import React, { Fragment } from "react";

function DeleteOverdueBar(props) {
  function handleClick() {
    props.onToggleDeleteOverdueAlert();
  }

  return (
    <Fragment>
      <button
        className="menu-icon-button delete-overdue-icon"
        onClick={handleClick}
        aria-label={`Delete all overdue tasks in current list: ${props.taskList.name}`}
      >
        <i className="fas fa-trash"></i>
      </button>
      <button
        className="delete-overdue-desc"
        onClick={handleClick}
        aria-label={`Delete all overdue tasks in current list: ${props.taskList.name}`}
      >
        <h2>Delete overdue tasks</h2>
      </button>
    </Fragment>
  );
}

export default DeleteOverdueBar;

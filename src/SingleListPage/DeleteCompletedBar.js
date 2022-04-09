import React, { Fragment } from "react";

function DeleteCompletedBar(props) {
  function handleClick() {
    props.onToggleDeleteCompletedAlert();
  }

  return (
    <Fragment>
      <button
        className="menu-icon-button delete-completed-icon"
        onClick={handleClick}
        tabIndex="-1"
      >
        <i className="fas fa-trash-alt"></i>
      </button>
      <button
        className="delete-completed-desc"
        onClick={handleClick}
        aria-label={`Delete all completed tasks in current list: ${props.taskList.name}`}
      >
        <h2>Delete completed tasks</h2>
      </button>
    </Fragment>
  );
}

export default DeleteCompletedBar;

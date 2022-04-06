import React, { Fragment } from "react";

function DeleteAllTasksBar(props) {
  function handleClick() {
    props.onToggleDeleteTasksAlert();
  }

  return (
    <Fragment>
      <i
        className="fas fa-dumpster delete-all-icon"
        onClick={handleClick}
        role="button"
        tabIndex="0"
        aria-label={`Delete all tasks in current list: ${props.taskList.name}`}
        onKeyDown={(e) =>
          e.code === "Enter" || e.code === "Space" ? handleClick() : null
        }
      ></i>
      <h2
        className="delete-all-desc"
        onClick={handleClick}
        role="button"
        tabIndex="0"
        aria-label={`Delete all tasks in current list: ${props.taskList.name}`}
        onKeyDown={(e) =>
          e.code === "Enter" || e.code === "Space" ? handleClick() : null
        }
      >
        Delete all tasks
      </h2>
    </Fragment>
  );
}

export default DeleteAllTasksBar;

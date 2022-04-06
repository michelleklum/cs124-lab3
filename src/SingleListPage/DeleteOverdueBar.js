import React, { Fragment } from "react";

function DeleteOverdueBar(props) {
  function handleClick() {
    props.onToggleDeleteOverdueAlert();
  }

  return (
    <Fragment>
      <i
        className="fas fa-trash delete-overdue-icon"
        onClick={handleClick}
        role="button"
        tabIndex="0"
        aria-label={`Delete all overdue tasks in current list: ${props.taskList.name}`}
        onKeyDown={(e) =>
          e.code === "Enter" || e.code === "Space" ? handleClick() : null
        }
      ></i>
      <h2
        className="delete-overdue-desc"
        onClick={handleClick}
        role="button"
        tabIndex="0"
        aria-label={`Delete all overdue tasks in current list: ${props.taskList.name}`}
        onKeyDown={(e) =>
          e.code === "Enter" || e.code === "Space" ? handleClick() : null
        }
      >
        Delete overdue tasks
      </h2>
    </Fragment>
  );
}

export default DeleteOverdueBar;

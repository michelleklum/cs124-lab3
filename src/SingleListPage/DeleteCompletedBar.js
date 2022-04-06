import React, { Fragment } from "react";

function DeleteCompletedBar(props) {
  function handleClick() {
    props.onToggleDeleteCompletedAlert();
  }

  return (
    <Fragment>
      <i
        className="fas fa-trash-alt delete-completed-icon"
        onClick={handleClick}
        role="button"
        tabIndex="0"
        aria-label={`Delete all completed tasks in current list: ${props.taskList.name}`}
        onKeyDown={(e) =>
          e.code === "Enter" || e.code === "Space" ? handleClick() : null
        }
      ></i>
      <h2
        className="delete-completed-desc"
        onClick={handleClick}
        role="button"
        tabIndex="0"
        aria-label={`Delete all completed tasks in current list: ${props.taskList.name}`}
        onKeyDown={(e) =>
          e.code === "Enter" || e.code === "Space" ? handleClick() : null
        }
      >
        Delete completed tasks
      </h2>
    </Fragment>
  );
}

export default DeleteCompletedBar;

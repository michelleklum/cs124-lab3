import React, { Fragment } from "react";

function DeleteListBar(props) {
  function handleClick() {
    props.onToggleDeleteListAlert();
  }

  return (
    <Fragment>
      <i
        className="fas fa-dumpster-fire delete-list-icon"
        onClick={handleClick}
        role="button"
        tabIndex="0"
        aria-label={`Delete current list: ${props.taskList.name}`}
        onKeyDown={(e) =>
          e.code === "Enter" || e.code === "Space" ? handleClick() : null
        }
      ></i>
      <h2
        className="delete-list-desc"
        onClick={handleClick}
        role="button"
        tabIndex="0"
        aria-label={`Delete current list: ${props.taskList.name}`}
        onKeyDown={(e) =>
          e.code === "Enter" || e.code === "Space" ? handleClick() : null
        }
      >
        Delete list
      </h2>
    </Fragment>
  );
}

export default DeleteListBar;

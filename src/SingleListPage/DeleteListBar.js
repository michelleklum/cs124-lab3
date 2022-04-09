import React, { Fragment } from "react";

function DeleteListBar(props) {
  function handleClick() {
    props.onToggleDeleteListAlert();
  }

  return (
    <Fragment>
      <button
        className="menu-icon-button delete-list-icon"
        onClick={handleClick}
        tabIndex="-1"
      >
        <i className="fas fa-dumpster-fire"></i>
      </button>
      <button
        className="delete-list-desc"
        onClick={handleClick}
        aria-label={`Delete current list: ${props.taskList.name}`}
      >
        <h2>Delete list</h2>
      </button>
    </Fragment>
  );
}

export default DeleteListBar;

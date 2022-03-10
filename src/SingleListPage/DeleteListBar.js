import React, { Fragment } from "react";

function DeleteListBar(props) {
  return (
    <Fragment>
      <i
        className="fas fa-dumpster-fire delete-list-icon"
        onClick={() => props.onToggleDeleteListAlert()}
      ></i>
      <h2
        className="delete-list-desc"
        onClick={() => props.onToggleDeleteListAlert()}
      >
        Delete list
      </h2>
    </Fragment>
  );
}

export default DeleteListBar;

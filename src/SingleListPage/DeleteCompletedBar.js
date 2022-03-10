import React, { Fragment } from "react";

function DeleteCompletedBar(props) {
  return (
    <Fragment>
      <i
        className="fas fa-trash-alt delete-completed-icon"
        onClick={() => props.onToggleDeleteCompletedAlert()}
      ></i>
      <h2
        className="delete-completed-desc"
        onClick={() => props.onToggleDeleteCompletedAlert()}
      >
        Delete completed tasks
      </h2>
    </Fragment>
  );
}

export default DeleteCompletedBar;

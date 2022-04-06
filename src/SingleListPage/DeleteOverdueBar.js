import React, { Fragment } from "react";

function DeleteOverdueBar(props) {
  return (
    <Fragment>
      <i
        className="fas fa-trash delete-overdue-icon"
        onClick={() => props.onToggleDeleteOverdueAlert()}
      ></i>
      <h2
        className="delete-overdue-desc"
        onClick={() => props.onToggleDeleteOverdueAlert()}
      >
        Delete overdue tasks
      </h2>
    </Fragment>
  );
}

export default DeleteOverdueBar;

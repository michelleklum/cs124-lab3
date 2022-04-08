import React, { Fragment } from "react";

function HideCompletedBar(props) {
  function changeListHideCompletedState() {
    props.onEditList(
      props.currentListId,
      "hideCompletedTasks",
      !props.hideCompletedTasks
    );
  }

  const hideShowVerb = props.hideCompletedTasks ? "Show" : "Hide";
  const hideShowIconClassName = props.hideCompletedTasks
    ? "fas fa-eye"
    : "fas fa-eye-slash";

  return (
    <Fragment>
      <button
        className="menu-icon-button hide-icon"
        onClick={changeListHideCompletedState}
        aria-label={`${hideShowVerb} completed tasks in current list: ${props.taskList.name}`}
      >
        <i className={hideShowIconClassName}></i>
      </button>
      <button
        className="hide-desc"
        onClick={changeListHideCompletedState}
        aria-label={`${hideShowVerb} completed tasks in current list: ${props.taskList.name}`}
      >
        <h2>{hideShowVerb} completed tasks</h2>
      </button>
    </Fragment>
  );
}

export default HideCompletedBar;

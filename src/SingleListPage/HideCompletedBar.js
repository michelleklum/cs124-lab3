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
      <Fragment>
        <i
          className={`${hideShowIconClassName} hide-icon`}
          onClick={changeListHideCompletedState}
          role="button"
          tabIndex="0"
          aria-label={`${hideShowVerb} completed tasks in current list: ${props.taskList.name}`}
          onKeyDown={(e) =>
            e.code === "Enter" || e.code === "Space"
              ? changeListHideCompletedState()
              : null
          }
        ></i>
        <h2
          className="hide-desc"
          onClick={changeListHideCompletedState}
          role="button"
          tabIndex="0"
          aria-label={`${hideShowVerb} completed tasks in current list: ${props.taskList.name}`}
          onKeyDown={(e) =>
            e.code === "Enter" || e.code === "Space"
              ? changeListHideCompletedState()
              : null
          }
        >
          {hideShowVerb} completed tasks
        </h2>
      </Fragment>
    </Fragment>
  );
}

export default HideCompletedBar;

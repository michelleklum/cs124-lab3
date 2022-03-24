import React, { Fragment } from "react";

function HideCompletedBar(props) {
  function changeListHideCompletedState() {
    props.onEditList(
      props.currentListId,
      "hideCompletedTasks",
      !props.hideCompletedTasks
    );
  }

  return (
    <Fragment>
      {props.hideCompletedTasks ? (
        <Fragment>
          <i
            className="fas fa-eye hide-icon"
            onClick={changeListHideCompletedState}
          ></i>
          <h2 className="hide-desc" onClick={changeListHideCompletedState}>
            Show completed tasks
          </h2>
        </Fragment>
      ) : (
        <Fragment>
          <i
            className="fas fa-eye-slash hide-icon"
            onClick={changeListHideCompletedState}
          ></i>
          <h2 className="hide-desc" onClick={changeListHideCompletedState}>
            Hide completed tasks
          </h2>
        </Fragment>
      )}
    </Fragment>
  );
}

export default HideCompletedBar;

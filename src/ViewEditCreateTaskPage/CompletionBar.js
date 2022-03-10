import React, { Fragment } from "react";
import Checkbox from "../Global/Checkbox";

function CompletionBar(props) {
  return (
    <Fragment>
      {props.inEditTaskMode ? (
        <Checkbox
          task={props.task}
          tempTaskStatus={props.tempTaskStatus}
          disableCheckbox={false}
          onChangeTaskStatus={props.onChangeTaskStatus}
          openDatePicker={props.openDatePicker}
          openTimePicker={props.openTimePicker}
        />
      ) : props.task.isTaskCompleted ? (
        <i className="fas fa-solid fa-check completed-icon-view-page"></i>
      ) : (
        <i className="fas fa-solid fa-spinner completed-icon-view-page"></i>
      )}
      <p
        className={[
          "set-completed",
          props.openDatePicker || props.openTimePicker
            ? "set-completed-picker-open"
            : "set-completed-picker-closed",
        ].join(" ")}
      >
        {props.tempTaskStatus ? "Completed" : "Not completed"}
      </p>
    </Fragment>
  );
}

export default CompletionBar;

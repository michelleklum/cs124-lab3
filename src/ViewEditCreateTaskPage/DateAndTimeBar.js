import React, { Fragment } from "react";
import "./DateAndTimeBar.css";

function DateAndTimeBar(props) {
  const dateEditCreateModeBackgroundClassName =
    props.inEditTaskMode || props.inCreateTaskMode
      ? "date-edit-background"
      : null;

  const timeEditCreateModeBackgroundClassName =
    props.inEditTaskMode || props.inCreateTaskMode
      ? "time-edit-background"
      : null;

  return (
    <Fragment>
      <i className="far fa-clock fa-4x set-date-icon"></i>
      <p
        className={["set-date", dateEditCreateModeBackgroundClassName].join(
          " "
        )}
        onClick={props.onDateClick}
      >
        {`${String(props.initialMonth).padStart(2, "0")}/${String(
          props.initialDay
        ).padStart(2, "0")}/${props.initialYear}`}
      </p>
      <p
        className={["set-time", timeEditCreateModeBackgroundClassName].join(
          " "
        )}
        onClick={props.onTimeClick}
      >
        {`${String(props.initialHour).padStart(2, "0")}:${String(
          props.initialMinute
        ).padStart(2, "0")} ${props.initialAmPm}`}
      </p>
    </Fragment>
  );
}

export default DateAndTimeBar;

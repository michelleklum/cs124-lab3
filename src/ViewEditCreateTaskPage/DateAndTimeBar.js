import React, { Fragment } from "react";
import "./DateAndTimeBar.css";

function convertMilitaryTimeToStandardTime(militaryTime) {
  // TODO: handle no time properly in the future
  militaryTime = militaryTime ? militaryTime : "12:00 AM";

  let amPm = "AM"; // assume AM for now

  let [hour, minute] = militaryTime.split(":");
  hour = parseInt(hour);
  if (hour > 12) {
    // PM times
    hour -= 12;
    amPm = "PM";
  } else if (hour === 0) {
    // 12:__ AM
    hour = 12;
    amPm = "AM";
  }

  return `${hour}:${minute} ${amPm}`;
}

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
        {props.tempTaskDate}
      </p>
      <p
        className={["set-time", timeEditCreateModeBackgroundClassName].join(
          " "
        )}
        onClick={props.onTimeClick}
      >
        {convertMilitaryTimeToStandardTime(props.tempTaskTime)}
      </p>
    </Fragment>
  );
}

export default DateAndTimeBar;

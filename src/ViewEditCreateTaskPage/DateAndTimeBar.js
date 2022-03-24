import React, { Fragment } from "react";
import "./DateAndTimeBar.css";

function DateAndTimeBar(props) {
  // Get date and time from tempTaskDeadline (which is a Firebase Timestamp)
  // Convert Firebase Timestamp to JavaScript Date object
  const tempTaskDeadlineJSDate = props.tempTaskDeadline.toDate();

  // Parse JavaScript Date object
  const initialMonth = tempTaskDeadlineJSDate.getMonth() + 1; // JavaScript Date object months are zero-indexed
  const initialDay = tempTaskDeadlineJSDate.getDate();
  const initialYear = tempTaskDeadlineJSDate.getFullYear();

  // Handle JavaScript Date object's use of military time
  const initialMilitaryHour = tempTaskDeadlineJSDate.getHours();
  let initialHour = initialMilitaryHour;
  let initialAmPm = "AM"; // assume AM for now
  if (initialMilitaryHour > 12) {
    // PM times
    initialHour -= 12;
    initialAmPm = "PM";
  } else if (initialMilitaryHour === 12) {
    // 12:00 PM
    initialHour = 12;
    initialAmPm = "PM";
  } else if (initialMilitaryHour === 0) {
    // 12:__ AM
    initialHour = 12;
    initialAmPm = "AM";
  }

  const initialMinute = tempTaskDeadlineJSDate.getMinutes();

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
        {`${String(initialMonth).padStart(2, "0")}/${String(
          initialDay
        ).padStart(2, "0")}/${initialYear}`}
      </p>
      <p
        className={["set-time", timeEditCreateModeBackgroundClassName].join(
          " "
        )}
        onClick={props.onTimeClick}
      >
        {`${String(initialHour).padStart(2, "0")}:${String(
          initialMinute
        ).padStart(2, "0")} ${initialAmPm}`}
      </p>
    </Fragment>
  );
}

export default DateAndTimeBar;

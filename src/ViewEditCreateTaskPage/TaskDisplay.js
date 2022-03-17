import React, { useState } from "react";
import "./TaskDisplay.css";
import DateAndTimeBar from "./DateAndTimeBar";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import AdditionalNotesBar from "./AdditionalNotesBar";
import CompletionBar from "./CompletionBar";
import { Timestamp } from "firebase/firestore";

function TaskDisplay(props) {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openTimePicker, setOpenTimePicker] = useState(false);

  // Convert Firebase Timestamp to JavaScript Date object
  const taskDeadlineJSDate = props.tempTaskDeadline.toDate();

  // Parse JavaScript Date object
  const initialMonth = taskDeadlineJSDate.getMonth() + 1; // JavaScript Date object months are zero-indexed
  const initialDay = taskDeadlineJSDate.getDate();
  const initialYear = taskDeadlineJSDate.getFullYear();

  const initialMinute = taskDeadlineJSDate.getMinutes();

  // Handle JavaScript Date object's use of military time
  const initialMilitaryHour = taskDeadlineJSDate.getHours();
  let initialHour = initialMilitaryHour;
  let initialAmPm = "AM"; // assume AM for now
  if (initialMilitaryHour > 12) {
    // PM times
    initialHour -= 12;
    initialAmPm = "PM";
  } else if (initialHour === 0) {
    // 12:__ AM
    initialHour = 12;
    initialAmPm = "AM";
  }

  function toggleDatePicker() {
    setOpenDatePicker(!openDatePicker);

    // close TimePicker if it's open
    if (openTimePicker) {
      toggleTimePicker();
    }
  }

  function toggleTimePicker() {
    setOpenTimePicker(!openTimePicker);

    // close DatePicker if it's open
    if (openDatePicker) {
      toggleDatePicker();
    }
  }

  return (
    <div
      id="task-display"
      className={
        openDatePicker || openTimePicker
          ? "task-display-picker-open"
          : "task-display-picker-closed"
      }
    >
      <DateAndTimeBar
        task={props.task}
        inEditTaskMode={props.inEditTaskMode}
        inCreateTaskMode={props.inCreateTaskMode}
        tempTaskDeadline={props.tempTaskDeadline}
        initialMonth={initialMonth}
        initialDay={initialDay}
        initialYear={initialYear}
        initialHour={initialHour}
        initialMinute={initialMinute}
        initialAmPm={initialAmPm}
        onDateClick={
          props.inEditTaskMode || props.inCreateTaskMode
            ? toggleDatePicker
            : null
        }
        onTimeClick={
          props.inEditTaskMode || props.inCreateTaskMode
            ? toggleTimePicker
            : null
        }
      />
      <AdditionalNotesBar
        currentListId={props.currentListId}
        task={props.task}
        inEditTaskMode={props.inEditTaskMode}
        inCreateTaskMode={props.inCreateTaskMode}
        tempTaskNotes={props.tempTaskNotes}
        onChangeTaskNotes={props.onChangeTaskNotes}
        openDatePicker={openDatePicker}
        openTimePicker={openTimePicker}
      />
      {openDatePicker ? (
        <DatePicker
          tempTaskDeadline={props.tempTaskDeadline}
          onChangeTaskDeadline={props.onChangeTaskDeadline}
          initialMonth={initialMonth}
          initialDay={initialDay}
          initialYear={initialYear}
          initialMilitaryHour={initialMilitaryHour}
          initialMinute={initialMinute}
          initialAmPm={initialAmPm}
        />
      ) : null}
      {openTimePicker ? (
        <TimePicker
          tempTaskDeadline={props.tempTaskDeadline}
          onChangeTaskDeadline={props.onChangeTaskDeadline}
          initialMonth={initialMonth}
          initialDay={initialDay}
          initialYear={initialYear}
          initialHour={initialHour}
          initialMinute={initialMinute}
          initialAmPm={initialAmPm}
        />
      ) : null}
      {!props.inCreateTaskMode && (
        <CompletionBar
          currentListId={props.currentListId}
          task={props.task}
          inEditTaskMode={props.inEditTaskMode}
          tempTaskStatus={props.tempTaskStatus}
          onChangeTaskStatus={props.onChangeTaskStatus}
          openDatePicker={openDatePicker}
          openTimePicker={openTimePicker}
        />
      )}
    </div>
  );
}

export default TaskDisplay;

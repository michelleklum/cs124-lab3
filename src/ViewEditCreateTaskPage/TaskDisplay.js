import React, { useState } from "react";
import "./TaskDisplay.css";
import DateAndTimeBar from "./DateAndTimeBar";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import AdditionalNotesBar from "./AdditionalNotesBar";
import CompletionBar from "./CompletionBar";

function TaskDisplay(props) {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openTimePicker, setOpenTimePicker] = useState(false);

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
        tempTaskDate={props.tempTaskDate}
        tempTaskTime={props.tempTaskTime}
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
          tempTaskDate={props.tempTaskDate}
          onChangeTaskDate={props.onChangeTaskDate}
        />
      ) : null}
      {openTimePicker ? (
        <TimePicker
          tempTaskTime={props.tempTaskTime}
          onChangeTaskTime={props.onChangeTaskTime}
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

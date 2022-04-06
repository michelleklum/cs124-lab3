import React, { Fragment } from "react";

function Checkbox(props) {
  const priorityColors = new Map();
  priorityColors.set(0, "#91C6C3");
  priorityColors.set(1, "#979DC7");
  priorityColors.set(2, "#FFBD52");
  priorityColors.set(3, "#ed554a");

  const priorityColor = props.priorityNumber
    ? priorityColors.get(props.priorityNumber)
    : "#91C6C3";

  const completedColor = props.fromTaskCard ? "#BAB2B5" : "#91C6C3";

  function handleEditTaskCompletionStatus() {
    // use onChangeTaskStatus for changing task completion status on View Edit Create Task Page
    props.onChangeTaskStatus && props.onChangeTaskStatus(!props.tempTaskStatus);

    // use onEditTask for changing task completion status on Single List Page (List of Tasks -> Task Card)
    props.onEditTask &&
      props.onEditTask(
        props.currentListId,
        props.task.id,
        "isCompleted",
        !props.tempTaskStatus
      );
  }

  // Styled the checkbox directly in the JSX because otherwise, the checkbox icon wouldn't appear.

  // fa-stop is a solid filled-in checkbox from Font Awesome.
  // To make it an outline instead, we turned its color to #FeFFFF to blend in with background,
  // and added a border.
  return (
    <Fragment>
      {props.tempTaskStatus ? (
        <i
          id={`task-${props.task.id}`}
          name={`is-task-${props.task.id}-complete`}
          className={[
            "fas fa-solid fa-check fa-4x set-completed-icon checkbox-checked",
            props.openDatePicker || props.openTimePicker
              ? "set-completed-icon-picker-open"
              : "set-completed-icon-picker-closed",
          ].join(" ")}
          style={{
            color: completedColor,
            fontSize: "23px",
            padding: "2px",
            border: completedColor + " solid medium",
            borderRadius: "7px",
          }}
          onClick={
            props.disableCheckbox ? null : handleEditTaskCompletionStatus
          }
          aria-label="Mark task uncompleted - task is currently completed"
          tabIndex="0"
          role="button"
          onKeyDown={(e) => (e.code === "Enter") ?
            (props.disableCheckbox ? null : handleEditTaskCompletionStatus()) : null}

        ></i>
      ) : (
        <i
          id={`task-${props.task.id}`}
          name={`is-task-${props.task.id}-complete`}
          className={[
            "fas fa-solid fa-stop fa-4x set-completed-icon checkbox-unchecked",
            props.openDatePicker || props.openTimePicker
              ? "set-completed-icon-picker-open"
              : "set-completed-icon-picker-closed",
          ].join(" ")}
          style={{
            color: "#FeFFFF",
            fontSize: "23px",
            padding: "2px 3.5px",
            border: priorityColor + " solid medium",
            borderRadius: "7px",
          }}
          onClick={
            props.disableCheckbox ? null : handleEditTaskCompletionStatus
          }
          aria-label="Mark task completed - task is currently uncompleted"
          tabIndex="0"
          role="button"
          onKeyDown={(e) => (e.code === "Enter") ?
            (props.disableCheckbox ? null : handleEditTaskCompletionStatus()) : null}
        ></i>
      )}
    </Fragment>
  );
}

export default Checkbox;

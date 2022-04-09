import React, { Fragment } from "react";
import PriorityBarEditor from "./PriorityBarEditor";

function PriorityBar(props) {
  const priorityLevels = new Map();
  priorityLevels.set(0, "None");
  priorityLevels.set(1, "Low");
  priorityLevels.set(2, "Medium");
  priorityLevels.set(3, "High");

  return (
    <Fragment>
      <div
        className={[
          "set-priority-icon-circle",
          props.openDatePicker || props.openTimePicker
            ? "set-priority-icon-picker-open"
            : "set-priority-icon-picker-closed",
        ].join(" ")}
      >
        <i className="fas fa-exclamation fa-4x set-priority-icon"></i>
      </div>
      {props.inEditTaskMode || props.inCreateTaskMode ? (
        <PriorityBarEditor
          currentListId={props.currentListId}
          task={props.task}
          inEditTaskMode={props.inEditTaskMode}
          tempTaskPriority={props.tempTaskPriority}
          onChangeTaskPriority={props.onChangeTaskPriority}
          openDatePicker={props.openDatePicker}
          openTimePicker={props.openTimePicker}
          priorityLevels={priorityLevels}
        />
      ) : (
        <p
          className={[
            "set-priority",
            props.openDatePicker || props.openTimePicker
              ? "set-priority-picker-open"
              : "set-priority-picker-closed",
          ].join(" ")}
        >
          {props.tempTaskPriority && props.tempTaskPriority !== 0
            ? priorityLevels.get(props.tempTaskPriority) + " priority"
            : "No priority"}
        </p>
      )}
    </Fragment>
  );
}

export default PriorityBar;

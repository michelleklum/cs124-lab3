import React, { Fragment } from "react";
import "./AdditionalNotesBar.css";
import AdditionalNotesEditor from "./AdditionalNotesEditor";

function AdditionalNotesBar(props) {
  return (
    <Fragment>
      <i
        className={[
          "fas fa-sticky-note fa-4x set-note-icon",
          props.openDatePicker || props.openTimePicker
            ? "set-note-icon-picker-open"
            : "set-note-icon-picker-closed",
        ].join(" ")}
      ></i>
      {props.inEditTaskMode || props.inCreateTaskMode ? (
        <AdditionalNotesEditor
          currentListId={props.currentListId}
          tempTaskNotes={props.tempTaskNotes}
          onChangeTaskNotes={props.onChangeTaskNotes}
          openDatePicker={props.openDatePicker}
          openTimePicker={props.openTimePicker}
        />
      ) : (
        <p
          className={[
            "set-note",
            props.openDatePicker || props.openTimePicker
              ? "set-note-picker-open"
              : "set-note-picker-closed",
          ].join(" ")}
        >
          {props.tempTaskNotes || "No additional notes"}
        </p>
      )}
    </Fragment>
  );
}

export default AdditionalNotesBar;

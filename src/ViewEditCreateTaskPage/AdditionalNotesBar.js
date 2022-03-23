import React, { Fragment, useState } from "react";
import "./AdditionalNotesBar.css";
import AdditionalNotesEditor from "./AdditionalNotesEditor";

function AdditionalNotesBar(props) {
  const [notesEdited, setNotesEdited] = useState(false);

  return (
    <Fragment>
      <div className="note-icon">
        <i
          className={[
            "fas fa-sticky-note fa-4x set-note-icon",
            props.openDatePicker || props.openTimePicker
              ? "set-note-icon-picker-open"
              : "set-note-icon-picker-closed",
          ].join(" ")}
        ></i>
      </div>
      {((props.inEditTaskMode || props.inCreateTaskMode) && notesEdited ? (
        <AdditionalNotesEditor
          currentListId={props.currentListId}
          tempTaskNotes={props.tempTaskNotes}
          onChangeTaskNotes={props.onChangeTaskNotes}
          openDatePicker={props.openDatePicker}
          openTimePicker={props.openTimePicker}
        />
      ) : (props.inEditTaskMode || props.inCreateTaskMode) ?
        <div className="set-note-before-edit set-note">
          <p
            className={[
              "set-note-text note-text-before-edit",
              props.openDatePicker || props.openTimePicker
                ? "set-note-picker-open"
                : "set-note-picker-closed",
              !props.tempTaskNotes ? "no-notes" : null
            ].join(" ")}
            onClick={() => setNotesEdited(true)}
          >
            {props.tempTaskNotes || "Enter additional notes"}
          </p>
        </div>
        : (
          <div className="set-note">
            <p
              className={[
                "set-note-text",
                props.openDatePicker || props.openTimePicker
                  ? "set-note-picker-open"
                  : "set-note-picker-closed",
              ].join(" ")}
            >
              {props.tempTaskNotes || "No additional notes"}
            </p>
          </div>
        ))}
    </Fragment>
  );
}

export default AdditionalNotesBar;

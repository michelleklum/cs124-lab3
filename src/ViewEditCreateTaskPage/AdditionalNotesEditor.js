import React, { useState } from "react";
import "./AdditionalNotesEditor.css";

function AdditionalNotesEditor(props) {
  const [textareaRows, setTextareaRows] = useState(1);

  // Makes sure new lines don't overflow additional notes box
  const newLineChars = props.tempTaskNotes.split(/\r\n|\r|\n/).length;
  const maxLength = 85 - newLineChars * 10;

  function placeCursorAtEndOfValueOnFocus(e) {
    const val = e.target.value;
    e.target.value = "";
    e.target.value = val;
  }

  // Automatically resizes textarea according to its scrollHeight, if necessary,
  // in order to show all text
  function handleTextareaChange(e) {
    const rowHeight = 27;
    const textareaRowsRequired =
      Math.ceil(e.target.scrollHeight / rowHeight) - 1;

    if (textareaRowsRequired > textareaRows) {
      setTextareaRows(textareaRowsRequired);
    }
  }

  return (
    <div
      className={[
        "set-note",
        "edit-task-notes",
        props.openDatePicker || props.openTimePicker
          ? "set-note-picker-open"
          : "set-note-picker-closed",
      ].join(" ")}
    >
      <textarea
        rows={textareaRows}
        onChange={handleTextareaChange}
        id="edit-task-notes"
        name="task-notes"
        maxLength={maxLength}
        placeholder="Enter additional notes"
        autoComplete="off"
        defaultValue={props.tempTaskNotes}
        autoFocus
        onFocus={function (e) {
          placeCursorAtEndOfValueOnFocus(e);
          handleTextareaChange(e);
        }}
        onInput={(e) => props.onChangeTaskNotes(e.target.value)}
      ></textarea>
    </div>
  );
}

export default AdditionalNotesEditor;

import React, { useState } from "react";
import "./EditTaskNameInput.css";

function EditTaskNameInput(props) {
  const [textareaRows, setTextareaRows] = useState(1);

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
    <div className="edit-task-name">
      <textarea
        rows={textareaRows}
        onChange={handleTextareaChange}
        id="edit-task-name"
        name="task-name"
        maxLength="40"
        placeholder="Task name"
        autoComplete="off"
        value={props.tempTaskName}
        autoFocus
        onFocus={function (e) {
          placeCursorAtEndOfValueOnFocus(e);
          handleTextareaChange(e);
        }}
        onInput={(e) => props.onChangeTaskName(e.target.value)}
      ></textarea>
    </div>
  );
}

export default EditTaskNameInput;

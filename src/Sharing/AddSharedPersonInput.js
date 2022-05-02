import React, { useState } from "react";
import "./AddSharedPersonInput.css";

function AddSharedPersonInput(props) {
  const [newPersonEmail, setNewPersonEmail] = useState("");

  function handleAddPerson() {
    const validEmailRegex = new RegExp(
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
    );

    if (props.sharedWith.includes(newPersonEmail)) {
      // Don't allow duplicate emails
      // Display alert saying that list has already been shared with this user
      props.onToggleUsageAlert();
      props.setUsageErrorMessage(
        `This list has already been shared with ${newPersonEmail}.`
      );
    } else if (newPersonEmail === "") {
      // Don't allow empty string for email
      // Display alert saying that user must enter a non-blank value in the email field
      props.onToggleUsageAlert();
      props.setUsageErrorMessage(
        "Email field blank. You must enter a valid email in order to share this list."
      );
    } else if (!validEmailRegex.test(newPersonEmail)) {
      // Don't allow invalid emails
      // Display alert saying that user must enter a valid email
      props.onToggleUsageAlert();
      props.setUsageErrorMessage(
        "Invalid email. You must enter a valid email address in order to share this list."
      );
    } else {
      // Valid email!
      // Add this email to the array of emails that this list is shared with, in both App state and Firebase database
      const updatedSharedWith = [...props.sharedWith, newPersonEmail];
      props.setSharedWith(updatedSharedWith);
      props.onEditList(props.currentListId, "sharedWith", updatedSharedWith);
    }

    // Clear input box
    setNewPersonEmail("");
  }

  return (
    <div className="add-shared-person-input">
      <input
        type="text"
        id="add-shared-person"
        name="add-shared-person"
        placeholder="Add Email"
        autoComplete="off"
        autoFocus
        value={newPersonEmail}
        onInput={(e) => setNewPersonEmail(e.target.value)}
        onKeyDown={(e) =>
          (e.code === "Enter" || e.code === "Space") && handleAddPerson()
        }
        aria-label="Enter email to share list"
      />
      <button
        className="add-shared-person-button right-aligned"
        aria-label="Enter email to share list"
        onClick={handleAddPerson}
      >
        <i className="fas fa-plus fa-3x"></i>
      </button>
    </div>
  );
}

export default AddSharedPersonInput;

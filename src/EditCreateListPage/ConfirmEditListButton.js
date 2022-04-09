import React, { useState, Fragment } from "react";

function ConfirmEditListButton(props) {
  const [confirmInProgress, setConfirmInProgress] = useState(false);

  function confirmEdit() {
    setConfirmInProgress(true);
    props.onEditListAppearance(
      props.currentListId,
      props.listName,
      props.listIcon
    );
    props.isLargeScreen && props.onToggleLargeScreenPopup();
  }

  function confirmCreateList() {
    setConfirmInProgress(true);
    props.onCreateList(props.listName, props.listIcon);
    props.isLargeScreen && props.onToggleLargeScreenPopup();
  }

  return (
    <Fragment>
      {confirmInProgress && (
        <button
          className="confirm-edit-list right-aligned"
          aria-label={"Cannot confirm list without list info"}
          onClick={() => confirmEdit()}>
          <i
            className="fas fa-check fa-4x"
            id="no-info"
          ></i>
        </button>
      )}
      {!confirmInProgress &&
        props.inEditListMode &&
        props.listName !== "" &&
        props.listIcon !== "" && (
          <button
            className="confirm-edit-list right-aligned"
            aria-label={"Confirm edited list"}>
            <i
              className="fas fa-check fa-4x"
            ></i>
          </button>
        )}
      {!confirmInProgress &&
        props.inEditListMode &&
        (props.listName === "" || props.listIcon === "") && (
          <button
            className="confirm-edit-list right-aligned"
            aria-label={"Cannot confirm edited list without list info"}>
            <i
              className="fas fa-check fa-4x"
              id="no-info"
            ></i>
          </button>
        )}
      {!confirmInProgress &&
        props.inCreateListMode &&
        props.listName !== "" &&
        props.listIcon !== "" && (
          <button
            className="confirm-edit-list right-aligned create-mode-confirm"
            aria-label={"Confirm created list"}
            onClick={() => confirmCreateList()}>
            <i
              className="fas fa-check fa-4x"
            ></i>
          </button>
        )}
      {!confirmInProgress &&
        props.inCreateListMode &&
        (props.listName === "" || props.listIcon === "") && (
          <button
            className="confirm-edit-list right-aligned"
            aria-label={"Cannot confirm created list without list info"}>
            <i
              className="fas fa-check fa-4x"
              id="no-info"
            ></i>
          </button>
        )}
    </Fragment>
  );
}

export default ConfirmEditListButton;

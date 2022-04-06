import React, { useState } from "react";

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
    <div>
      {confirmInProgress && (
        <div className="confirm-edit-list right-aligned">
          <i
            className="fas fa-check fa-4x"
            id="no-info"
            aria-label={"Cannot confirm list without list info"}
            tabIndex="0"
          ></i>
        </div>
      )}
      {!confirmInProgress &&
        props.inEditListMode &&
        props.listName !== "" &&
        props.listIcon !== "" && (
          <div className="confirm-edit-list right-aligned">
            <i
              className="fas fa-check fa-4x"
              aria-label={"Confirm edited list"}
              tabIndex="0"
              role="button"
              onKeyDown={(e) => (e.code === "Enter") ? confirmEdit() : null}
              onClick={() => confirmEdit()}></i>
          </div>
        )}
      {!confirmInProgress &&
        props.inEditListMode &&
        (props.listName === "" || props.listIcon === "") && (
          <div className="confirm-edit-list right-aligned">
            <i
              className="fas fa-check fa-4x"
              id="no-info"
              aria-label={"Cannot confirm edited list without list info"}
              tabIndex="0"
            ></i>
          </div>
        )}
      {!confirmInProgress &&
        props.inCreateListMode &&
        props.listName !== "" &&
        props.listIcon !== "" && (
          <div className="confirm-edit-list right-aligned create-mode-confirm">
            <i
              className="fas fa-check fa-4x"
              aria-label={"Confirm created list"}
              tabIndex="0"
              role="button"
              onKeyDown={(e) => (e.code === "Enter") ? confirmCreateList() : null}
              onClick={() => confirmCreateList()}
            ></i>
          </div>
        )}
      {!confirmInProgress &&
        props.inCreateListMode &&
        (props.listName === "" || props.listIcon === "") && (
          <div className="confirm-edit-list right-aligned">
            <i
              className="fas fa-check fa-4x"
              id="no-info"
              aria-label={"Cannot confirm created list without list info"}
              tabIndex="0"
            ></i>
          </div>
        )}
    </div>
  );
}

export default ConfirmEditListButton;

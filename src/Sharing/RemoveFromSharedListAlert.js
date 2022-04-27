import "./RemoveFromSharedListAlert.css";
import FocusTrap from "focus-trap-react";

function RemoveFromSharedListAlert(props) {
  function handleRemoveFromSharedList() {
    // Remove current user's email from the array of emails that this list is shared with
    const updatedSharedWith = props.sharedWith.filter(
      (email) => email !== props.user.email
    );
    props.setSharedWith(updatedSharedWith);
    props.onEditList(props.currentListId, "sharedWith", updatedSharedWith);
    props.onChangePage("Home"); // otherwise, if user remains on SingleListPage, they will try to find a list they don't have access to
  }

  return (
    <FocusTrap>
      <div className="backdrop">
        <div className="remove-from-shared-list-alert">
          <h3 className="remove-from-shared-list-alert-description">
            Are you sure you want to remove yourself from this shared list?
          </h3>
          <div className="remove-from-shared-list-alert-buttons">
            <button
              className="remove-from-shared-list-alert-button remove-from-shared-list-alert-cancel"
              type="button"
              onClick={() => props.onToggleRemoveFromSharedListAlert()}
              aria-label="Cancel remove from shared list"
            >
              Cancel
            </button>
            <button
              className={
                "remove-from-shared-list-alert-button remove-from-shared-list-alert-yes"
              }
              type={"button"}
              onClick={handleRemoveFromSharedList}
              aria-label="Confirm remove from shared list"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default RemoveFromSharedListAlert;

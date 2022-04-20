import "./StopSharingAlert.css";
import FocusTrap from "focus-trap-react";

function StopSharingAlert(props) {
  function handleStopSharing() {
    // Remove all emails except for the owner's (current user's) from sharedWith array
    props.setSharedWith([props.user.email]);
    props.onEditList(props.currentListId, "sharedWith", [props.user.email]);
    props.onToggleStopSharingAlert();
  }

  return (
    <FocusTrap>
      <div className="backdrop">
        <div className="alert">
          <h3 className="alert-description">
            Are you sure you want to stop sharing this list?
          </h3>
          <div className="alert-buttons">
            <button
              className="alert-button alert-cancel"
              type="button"
              onClick={() => props.onToggleStopSharingAlert()}
              aria-label="Cancel stop sharing"
            >
              Cancel
            </button>
            <button
              className={"alert-button alert-yes"}
              type={"button"}
              onClick={handleStopSharing}
              aria-label="Confirm stop sharing"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default StopSharingAlert;

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
        <div className="stop-sharing-alert">
          <h3 className="stop-sharing-alert-description">
            Are you sure you want to stop sharing this list?
          </h3>
          <div className="stop-sharing-alert-buttons">
            <button
              className="stop-sharing-alert-button stop-sharing-alert-cancel"
              type="button"
              onClick={() => props.onToggleStopSharingAlert()}
              aria-label="Cancel stop sharing"
            >
              Cancel
            </button>
            <button
              className="stop-sharing-alert-button stop-sharing-alert-yes"
              type="button"
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

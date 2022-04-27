import "./UsageAlert.css";
import FocusTrap from "focus-trap-react";

function UsageAlert(props) {
  return (
    <FocusTrap>
      <div className="backdrop">
        <div className="usage-alert">
          <h3 className="usage-alert-description">{props.usageErrorMessage}</h3>
          <div className="usage-alert-buttons">
            <button
              className="usage-alert-button usage-alert-cancel"
              type="button"
              onClick={() => props.onToggleUsageAlert()}
              aria-label="Got it"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default UsageAlert;

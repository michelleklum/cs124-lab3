import "./UsageAlert.css";
import FocusTrap from "focus-trap-react";

function UsageAlert(props) {
  return (
    <FocusTrap>
      <div className="backdrop">
        <div className="alert">
          <h3 className="alert-description">{props.usageErrorMessage}</h3>
          <div className="alert-buttons">
            <button
              className="alert-button alert-cancel"
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

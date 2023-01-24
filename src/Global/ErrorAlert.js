import React, { useState } from "react";
import "./ErrorAlert.css";
import FocusTrap from "focus-trap-react";

function ErrorAlert(props) {
  const [reportSubmitted, setReportSubmitted] = useState(false);

  function submitError() {
    setReportSubmitted(true);
    props.onCreateErrorReport(props.error);
  }

  return (
    <FocusTrap>
      <div className="backdrop">
        <div className="error-alert">
          <h3 className="alert-description">
            We've noticed an error loading your data. Try reopening your app,
            and feel free to report this issue below.
          </h3>
          <div className="alert-buttons">
            {!reportSubmitted && (
              <button
                className={"alert-button alert-report"}
                type={"button"}
                onClick={submitError}
              >
                Report
              </button>
            )}
            {reportSubmitted && (
              <div className={"alert-button error-reported"} type={"button"}>
                <p>Thanks for reporting!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default ErrorAlert;

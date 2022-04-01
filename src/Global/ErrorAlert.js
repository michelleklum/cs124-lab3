import React, { useState } from "react";
import "./ErrorAlert.css";

function DeleteAlert(props) {
  const [reportSubmitted, setReportSubmitted] = useState(false);

  function submitError() {
    setReportSubmitted(true);
    props.onCreateErrorReport();
  }

  return (
    <div className="backdrop">
      <div className="error-alert">
        <h3 className="alert-description">
          We've noticed an error loading your data. Try reopening your app, and
          feel free to report this issue below.
        </h3>
        <div className="alert-buttons">
          {!reportSubmitted && (
            <div
              className={"alert-button alert-report"}
              type={"button"}
              onClick={submitError}
            >
              Report
            </div>
          )}
          {reportSubmitted && (
            <div className={"alert-button error-reported"} type={"button"}>
              Thanks for reporting!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeleteAlert;

import React, { Fragment } from "react";

function SharingBar(props) {
  function handleClick() {
    props.onChangePage("SharingPage");
    props.isLargeScreen && props.onToggleLargeScreenPopup();
  }

  // Owner's email will always be in sharedWith, so list is really only shared with others if length of sharedWith array is > 1
  const sharingIconClassName =
    props.taskList.sharedWith.length > 1 ? "fa-users" : "fa-user-lock";

  return (
    <Fragment>
      <button
        className="menu-icon-button sharing-icon"
        onClick={handleClick}
        tabIndex="-1"
      >
        <i className={`fas ${sharingIconClassName}`}></i>
      </button>
      <button
        className="sharing-desc"
        onClick={handleClick}
        aria-label={`Enter sharing options page for current list: ${props.taskList.name}`}
      >
        <h2>Sharing options</h2>
      </button>
    </Fragment>
  );
}

export default SharingBar;

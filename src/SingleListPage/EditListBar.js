import React, { Fragment } from "react";

function EditListBar(props) {
  function handleClick() {
    props.onChangePage("EditListPage");
    props.isLargeScreen && props.onToggleLargeScreenPopup();
  }

  return (
    <Fragment>
      <button
        className="menu-icon-button customize-list-icon"
        onClick={handleClick}
        aria-label={`Customize current list: ${props.taskList.name}`}
      >
        <i className="fas fa-palette"></i>
      </button>
      <button
        className="customize-list-desc"
        onClick={handleClick}
        aria-label={`Customize current list: ${props.taskList.name}`}
      >
        <h2>Customize list</h2>
      </button>
    </Fragment>
  );
}

export default EditListBar;

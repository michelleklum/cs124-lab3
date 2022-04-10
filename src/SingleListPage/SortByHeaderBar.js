import React, { Fragment } from "react";

function SortByHeaderBar(props) {
  function handleClick() {
    props.onChangeMenuModeType("general");
  }

  return (
    <Fragment>
      <button
        className="sort-by-header-back-icon"
        onClick={handleClick}
        aria-label={`Return to general options menu for current list: ${props.taskList.name}`}
      >
        <i className="fas fa-chevron-left fa-4x"></i>
      </button>
      <h2 className="sort-by-header-desc">Sort tasks by...</h2>
    </Fragment>
  );
}

export default SortByHeaderBar;

import React, { Fragment } from "react";

function SortBar(props) {
  function handleClick() {
    props.onChangeMenuModeType("sorting");
  }

  return (
    <Fragment>
      <button
        className="menu-icon-button sort-icon"
        onClick={handleClick}
        tabIndex="-1"
      >
        <i className="fas fa-sort-amount-down"></i>
      </button>
      <button
        className="sort-desc"
        onClick={handleClick}
        aria-label={`Enter sorting options menu for current list: ${props.taskList.name}`}
      >
        <h2>Sort</h2>
      </button>
      <button
        className="sort-enter-icon"
        onClick={handleClick}
        tabIndex="-1"
      >
        <i className="fas fa-chevron-right fa-4x"></i>
      </button>
    </Fragment>
  );
}

export default SortBar;

import React, { Fragment } from "react";

function SortByHeaderBar(props) {
  function handleClick() {
    props.onChangeMenuModeType("general");
  }

  return (
    <Fragment>
      <i
        className="fas fa-chevron-left fa-4x sort-by-header-back-icon"
        onClick={handleClick}
        role="button"
        tabIndex="0"
        aria-label={`Return to general options menu for current list: ${props.taskList.name}`}
        onKeyDown={(e) =>
          e.code === "Enter" || e.code === "Space" ? handleClick() : null
        }
      ></i>
      <h2 className="sort-by-header-desc">Sort tasks by...</h2>
    </Fragment>
  );
}

export default SortByHeaderBar;

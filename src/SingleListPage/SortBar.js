import React, { Fragment } from "react";

function SortBar(props) {
  function handleClick() {
    props.onChangeMenuModeType("sorting");
  }

  return (
    <Fragment>
      <i
        className="fas fa-sort-amount-down sort-icon"
        onClick={handleClick}
        role="button"
        tabIndex="0"
        aria-label={`Enter sorting options menu for current list: ${props.taskList.name}`}
        onKeyDown={(e) =>
          e.code === "Enter" || e.code === "Space" ? handleClick() : null
        }
      ></i>
      <h2
        className="sort-desc"
        onClick={handleClick}
        role="button"
        tabIndex="0"
        aria-label={`Enter sorting options menu for current list: ${props.taskList.name}`}
        onKeyDown={(e) =>
          e.code === "Enter" || e.code === "Space" ? handleClick() : null
        }
      >
        Sort
      </h2>
      <i
        className="fas fa-chevron-right fa-4x sort-enter-icon"
        onClick={handleClick}
        role="button"
        tabIndex="0"
        aria-label={`Enter sorting options menu for current list: ${props.taskList.name}`}
        onKeyDown={(e) =>
          e.code === "Enter" || e.code === "Space" ? handleClick() : null
        }
      ></i>
    </Fragment>
  );
}

export default SortBar;

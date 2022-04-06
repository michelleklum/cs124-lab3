import React, { Fragment } from "react";

function EditListBar(props) {
  function handleClick() {
    props.onChangePage("EditListPage");
    props.isLargeScreen && props.onToggleLargeScreenPopup();
  }

  return (
    <Fragment>
      <i
        className="fas fa-palette customize-list-icon"
        onClick={handleClick}
        role="button"
        tabIndex="0"
        aria-label={`Customize current list: ${props.taskList.name}`}
        onKeyDown={(e) =>
          e.code === "Enter" || e.code === "Space" ? handleClick() : null
        }
      ></i>
      <h2
        className="customize-list-desc"
        onClick={handleClick}
        role="button"
        tabIndex="0"
        aria-label={`Customize current list: ${props.taskList.name}`}
        onKeyDown={(e) =>
          e.code === "Enter" || e.code === "Space" ? handleClick() : null
        }
      >
        Customize list
      </h2>
    </Fragment>
  );
}

export default EditListBar;

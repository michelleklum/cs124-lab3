import React, { Fragment } from "react";

function SortByHeaderBar(props) {
  return (
    <Fragment>
      {/* <i
        className="fas fa-calendar-plus sort-by-creation-time-icon"
        onClick={() => props.onChangeSort("creationTime")}
      ></i> */}
      <i
        className="fas fa-chevron-left fa-4x sort-by-header-back-icon"
        onClick={() => props.onChangeMenuModeType("general")}
      ></i>
      <h2 className="sort-by-header-desc">Sort tasks by...</h2>
    </Fragment>
  );
}

export default SortByHeaderBar;

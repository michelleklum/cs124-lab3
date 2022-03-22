import React, { Fragment } from "react";

function SortBar(props) {
  return (
    <Fragment>
      <i
        className="fas fa-sort-amount-down sort-icon"
        onClick={() => props.onChangeMenuModeType("sorting")}
      ></i>
      <h2
        className="sort-desc"
        onClick={() => props.onChangeMenuModeType("sorting")}
      >
        Sort
      </h2>
      <i
        className="fas fa-chevron-right fa-4x sort-enter-icon"
        onClick={() => props.onChangeMenuModeType("sorting")}
      ></i>
    </Fragment>
  );
}

export default SortBar;

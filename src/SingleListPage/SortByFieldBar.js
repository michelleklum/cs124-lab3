import React, { Fragment } from "react";

function SortByFieldBar(props) {
  function handleClick() {
    props.onChangeSort(props.barSortField);
  }

  const ascendingDescendingAdjective =
    props.listTasksPrimarySortDirection === "asc" ? "ascending" : "descending";

  const notSelectedSortFieldAriaLabel = `Tasks in current list ${props.taskList.name} are currently sorted by ${props.listTasksPrimarySortField}, ${ascendingDescendingAdjective}. Change sorting method for current list ${props.taskList.name} to ${props.barSortFieldText}`;
  const selectedSortFieldAriaLabel = `Tasks in current list ${props.taskList.name} are currently sorted by ${props.listTasksPrimarySortField}, ${ascendingDescendingAdjective}. Toggle sorting direction`;

  const sortArrowIconClassName =
    props.listTasksPrimarySortDirection === "asc"
      ? "fas fa-long-arrow-alt-down fa-4x"
      : "fas fa-long-arrow-alt-up fa-4x";

  return (
    <Fragment>
      <button
        className={`menu-icon-button sort-by-${props.barSortFieldAbbrev}-icon`}
        onClick={handleClick}
        aria-label={
          props.listTasksPrimarySortField === props.barSortField
            ? selectedSortFieldAriaLabel
            : notSelectedSortFieldAriaLabel
        }
      >
        <i className={props.barSortIcon}></i>
      </button>
      <button
        className={`sort-by-${props.barSortFieldAbbrev}-desc`}
        onClick={handleClick}
        aria-label={
          props.listTasksPrimarySortField === props.barSortField
            ? selectedSortFieldAriaLabel
            : notSelectedSortFieldAriaLabel
        }
      >
        <h2>{props.barSortFieldText}</h2>
      </button>
      {props.listTasksPrimarySortField === props.barSortField && (
        <button
          className={`sort-by-${props.barSortFieldAbbrev}-indicator`}
          onClick={handleClick}
          aria-label={selectedSortFieldAriaLabel}
        >
          <i className={sortArrowIconClassName}></i>
        </button>
      )}
    </Fragment>
  );
}

export default SortByFieldBar;

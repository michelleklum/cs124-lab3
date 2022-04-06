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
      <i
        className={`${props.barSortIcon} sort-by-${props.barSortFieldAbbrev}-icon`}
        onClick={handleClick}
        role="button"
        tabIndex="0"
        aria-label={
          props.listTasksPrimarySortField === props.barSortField
            ? selectedSortFieldAriaLabel
            : notSelectedSortFieldAriaLabel
        }
        onKeyDown={(e) =>
          e.code === "Enter" || e.code === "Space" ? handleClick() : null
        }
      ></i>
      <h2
        className={`sort-by-${props.barSortFieldAbbrev}-desc`}
        onClick={handleClick}
        role="button"
        tabIndex="0"
        aria-label={
          props.listTasksPrimarySortField === props.barSortField
            ? selectedSortFieldAriaLabel
            : notSelectedSortFieldAriaLabel
        }
        onKeyDown={(e) =>
          e.code === "Enter" || e.code === "Space" ? handleClick() : null
        }
      >
        {props.barSortFieldText}
      </h2>
      {props.listTasksPrimarySortField === props.barSortField && (
        <i
          className={`${sortArrowIconClassName} sort-by-${props.barSortFieldAbbrev}-indicator`}
          onClick={handleClick}
          role="button"
          tabIndex="0"
          aria-label={selectedSortFieldAriaLabel}
          onKeyDown={(e) =>
            e.code === "Enter" || e.code === "Space" ? handleClick() : null
          }
        ></i>
      )}
    </Fragment>
  );
}

export default SortByFieldBar;

import React, { Fragment } from "react";

function SortByFieldBar(props) {
  function handleClick() {
    props.onChangeSort(props.barSortField);
  }

  let sortDirectionWords =
    props.listTasksPrimarySortDirection === "asc" ? "ascending" : "descending";
  // eslint-disable-next-line default-case
  switch (props.listTasksPrimarySortField) {
    case "priority":
      sortDirectionWords =
        props.listTasksPrimarySortDirection === "asc"
          ? "from low to high"
          : "from high to low";
      break;
    case "deadline":
      sortDirectionWords =
        props.listTasksPrimarySortDirection === "asc"
          ? "from earliest to latest"
          : "from latest to earliest";
      break;
    case "nameLowercasedForSorting":
      sortDirectionWords =
        props.listTasksPrimarySortDirection === "asc"
          ? "alphabetically"
          : "reverse alphabetically";
      break;
    case "creationTime":
      sortDirectionWords =
        props.listTasksPrimarySortDirection === "asc"
          ? "from least recent to most recent"
          : "from most recent to least recent";
      break;
    case "modifiedTime":
      sortDirectionWords =
        props.listTasksPrimarySortDirection === "asc"
          ? "from least recent to most recent"
          : "from most recent to least recent";
      break;
  }

  let sortMethodWord = props.listTasksPrimarySortField;
  // eslint-disable-next-line default-case
  switch (sortMethodWord) {
    case "nameLowercasedForSorting":
      sortMethodWord = "name";
      break;
    case "creationTime":
      sortMethodWord = "creation time";
      break;
    case "modifiedTime":
      sortMethodWord = "modification time";
      break;
  }

  const notSelectedSortFieldAriaLabel = `Tasks in current list ${props.taskList.name} are currently sorted by ${sortMethodWord}, ${sortDirectionWords}. Change sorting method for current list ${props.taskList.name} to ${props.barSortFieldText}`;
  const selectedSortFieldAriaLabel = `Tasks in current list ${props.taskList.name} are currently sorted by ${sortMethodWord}, ${sortDirectionWords}. Toggle sorting direction`;

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

import React, { Fragment } from "react";

function SortByFieldBar(props) {
  const sortArrowIconClassName =
    props.listTasksPrimarySortDirection === "asc"
      ? "fas fa-long-arrow-alt-down fa-4x"
      : "fas fa-long-arrow-alt-up fa-4x";
  return (
    <Fragment>
      <i
        className={`${props.barSortIcon} sort-by-${props.barSortFieldAbbrev}-icon`}
        onClick={() => props.onChangeSort(props.barSortField)}
      ></i>
      <h2
        className={`sort-by-${props.barSortFieldAbbrev}-desc`}
        onClick={() => props.onChangeSort(props.barSortField)}
      >
        {props.barSortFieldText}
      </h2>
      {props.listTasksPrimarySortField === props.barSortField && (
        <i
          className={`${sortArrowIconClassName} sort-by-${props.barSortFieldAbbrev}-indicator`}
          onClick={() => props.onChangeSort(props.barSortField)}
        ></i>
      )}
    </Fragment>
  );
}

export default SortByFieldBar;

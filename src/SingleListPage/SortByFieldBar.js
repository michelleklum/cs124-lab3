import React, { Fragment } from "react";

function SortByFieldBar(props) {
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
          className={`fas fa-check fa-4x sort-by-${props.barSortFieldAbbrev}-check`}
        ></i>
      )}
    </Fragment>
  );
}

export default SortByFieldBar;

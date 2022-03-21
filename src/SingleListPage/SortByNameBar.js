import React, { Fragment } from "react";

function SortByNameBar(props) {
  function changeListToSortByName() {
    props.onEditList(props.currentListId, "sortBy", "name");
  }

  return (
    <Fragment>
      <i
        className="fas fa-sort-alpha-down sort-by-name-icon"
        onClick={changeListToSortByName}
      ></i>
      <h2 className="sort-by-name-desc" onClick={changeListToSortByName}>
        Sort tasks by name
      </h2>
    </Fragment>
  );
}

export default SortByNameBar;

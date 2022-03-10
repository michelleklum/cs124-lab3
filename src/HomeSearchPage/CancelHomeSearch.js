import React, { Fragment } from "react";
import "./CancelHomeSearch.css";

function CancelHomeSearch(props) {
  return (
    <Fragment>
      <h3
        className="right-aligned"
        id="cancel-search"
        onClick={() => props.onChangePage(props.prevPage)}
      >
        Cancel
      </h3>
    </Fragment>
  );
}

export default CancelHomeSearch;

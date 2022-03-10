import React, { Fragment } from "react";

function EditListBar(props) {
  return (
    <Fragment>
      <i
        className="fas fa-palette customize-list-icon"
        onClick={() => props.onChangePage("EditListPage")}
      ></i>
      <h2
        className="customize-list-desc"
        onClick={() => props.onChangePage("EditListPage")}
      >
        Customize list
      </h2>
    </Fragment>
  );
}

export default EditListBar;

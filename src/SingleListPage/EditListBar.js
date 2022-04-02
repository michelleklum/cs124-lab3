import React, { Fragment } from "react";

function EditListBar(props) {
  function handleEditListBarClick() {
    props.onChangePage("EditListPage");
    props.isLargeScreen && props.onToggleLargeScreenPopup();
  }

  return (
    <Fragment>
      <i
        className="fas fa-palette customize-list-icon"
        onClick={handleEditListBarClick}
      ></i>
      <h2 className="customize-list-desc" onClick={handleEditListBarClick}>
        Customize list
      </h2>
    </Fragment>
  );
}

export default EditListBar;

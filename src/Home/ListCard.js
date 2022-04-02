import React, { Fragment, useState } from "react";
import "./ListCard.css";
import EnterListArrow from "./EnterListArrow";
import EditListButton from "./EditListButton";
import DeleteListButton from "./DeleteListButton";

function ListCard(props) {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const inEditMode = (props.listInEditMode === props.id);

  /* The three functions below handle user swiping left or right on ListCard to reveal / hide edit and delete icons */
  function handleTouchStart(e) {
    setTouchStart(e.targetTouches[0].clientX);
  }

  function handleTouchMove(e) {
    setTouchEnd(e.targetTouches[0].clientX);
  }

  function handleTouchEnd() {
    // touchEnd !== 0 ensures there's a drag, not a click/tap
    if (touchStart - touchEnd > 75 && touchEnd !== 0
      && !inEditMode && !props.isLargeScreen) {
      props.onEditList(props.id);
    }
    if (touchStart - touchEnd < -75 && touchEnd !== 0 
      && inEditMode && !props.isLargeScreen) {
      props.onEditList(null);
    }

    // reset touchStart and touchEnd states to initial values of 0
    setTouchStart(0);
    setTouchEnd(0);
  }

  function handleListCardClick() {
    if (!inEditMode) {
      props.onChangePage("SingleListPage");
      props.onChangeList(props.id);
    }
  }

  let gridClassName = inEditMode ? "edit-list-grid" : "list-grid";
  let largeScreenName = props.isLargeScreen ? "large-screen-list-card" : "";
  let selectedList = (props.isLargeScreen && props.id === props.currentListId) ? 
                        "selected-list" : "";
  
  console.log(props.id)
  console.log(props.currentListId)

  return (
    <div
      className={["list", gridClassName, largeScreenName, selectedList].join(" ")}
      onClick={handleListCardClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <i className={`fas fa-${props.listIcon} fa-4x list-icon`}></i>
      <h2>{props.listName}</h2>
      {inEditMode ? (
        <Fragment>
          <EditListButton
            onChangePage={props.onChangePage}
            id={props.id}
            onChangeList={props.onChangeList}
          />
          <DeleteListButton
            onToggleDeleteAlert={props.onToggleDeleteAlert}
            onChangeList={props.onChangeList}
            id={props.id} />
        </Fragment>
      ) : (
        <EnterListArrow
          onListIconClick={() => props.onEditList(null)}
          isLargeScreen={props.isLargeScreen} />
      )}
    </div>
  );
}

export default ListCard;

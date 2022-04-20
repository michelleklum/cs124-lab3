import "./ListOfLists.css";
import React, { Fragment, useState } from "react";
import ListCard from "./ListCard";

function ListOfLists(props) {
  const [listInEditMode, setListInEditMode] = useState(null);

  function handleEditListMode(listId) {
    setListInEditMode(listId);
  }

  const ownedLists = props.user
    ? props.data.filter((list) => list.owner === props.user.uid)
    : props.data;
  const sharedLists = props.user
    ? props.data.filter((list) => list.owner !== props.user.uid)
    : [];

  return (
    <div
      className={[
        "list-of-lists",
        props.isLargeScreen ? "large-screen-list" : "",
      ].join(" ")}
    >
      {props.data && props.data.length === 0 && (
        <h3 className="no-lists-message">No Lists</h3>
      )}
      {ownedLists.map((list) => (
        <ListCard
          isLargeScreen={props.isLargeScreen}
          key={list.id}
          id={list.id}
          listName={list.name}
          listIcon={list.icon}
          currentListId={props.currentListId}
          onChangePage={props.onChangePage}
          onChangeList={props.onChangeList}
          onDeleteList={props.onDeleteList}
          onToggleDeleteAlert={props.onToggleDeleteAlert}
          listInEditMode={listInEditMode}
          onEditList={handleEditListMode}
          setSearchQuery={props.setSearchQuery}
        />
      ))}
      {sharedLists.length > 0 &&
        (props.isLargeScreen ? (
          <h3 className="large-screen-shared-with-you-header">
            Shared With You
          </h3>
        ) : (
          <Fragment>
            <h3 className="shared-with-you-message">Shared With You</h3>
            <hr />
          </Fragment>
        ))}
      {sharedLists.map((list) => (
        <ListCard
          isLargeScreen={props.isLargeScreen}
          key={list.id}
          id={list.id}
          listName={list.name}
          listIcon={list.icon}
          currentListId={props.currentListId}
          onChangePage={props.onChangePage}
          onChangeList={props.onChangeList}
          onDeleteList={props.onDeleteList}
          onToggleDeleteAlert={props.onToggleDeleteAlert}
          listInEditMode={listInEditMode}
          onEditList={handleEditListMode}
          setSearchQuery={props.setSearchQuery}
        />
      ))}
    </div>
  );
}

export default ListOfLists;

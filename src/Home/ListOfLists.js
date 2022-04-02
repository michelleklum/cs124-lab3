import "./ListOfLists.css";
import React, { useState } from "react";
import ListCard from "./ListCard";

function ListOfLists(props) {
  const [listInEditMode, setListInEditMode] = useState(null);

  function handleEditListMode(listId) {
    setListInEditMode(listId);
  }

  return (
    <div className={[
      "list-of-lists",
      props.isLargeScreen
        ? "large-screen-list"
        : "",
    ].join(" ")}>
      {props.data.length === 0 && 
      <h3 
      className="no-lists-message">
        No Lists
        </h3>}
      {props.data.map((list) => (
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
        />
      ))}
    </div>
  );
}

export default ListOfLists;

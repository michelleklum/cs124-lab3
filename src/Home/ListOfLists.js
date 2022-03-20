import "./ListOfLists.css";
import React, { useState } from "react";
import ListCard from "./ListCard";

function ListOfLists(props) {
  const [listInEditMode, setListInEditMode] = useState(null);

  function handleEditListMode(listId) {
    setListInEditMode(listId);
  }

  return (
    <div id="list-of-lists">
      {props.data.map((list) => (
        <ListCard
          key={list.id}
          id={list.id}
          listName={list.name}
          listIcon={list.icon}
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

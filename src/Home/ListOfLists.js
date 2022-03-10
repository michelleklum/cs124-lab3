import "./ListOfLists.css";
import React, { useState } from 'react';
import ListCard from "./ListCard";

function ListOfLists(props) {
  const [listInEditMode, setListInEditMode] = useState(null);

  function handleEditListMode(listId) {
    setListInEditMode(listId);
  }

  function sortListsCompareFunction(a, b) {
    return a.listName.toLowerCase() < b.listName.toLowerCase() ? -1 : 1;
  }

  return (
    <div id="list-of-lists">
      {props.data.sort(sortListsCompareFunction).map((list) => (
        <ListCard
          key={list.id}
          id={list.id}
          listName={list.listName}
          listIcon={list.listIcon}
          onChangePage={props.onChangePage}
          onChangeList={props.onChangeList}
          onDeleteList={props.onDeleteList}
          onToggleDeleteAlert={props.onToggleDeleteAlert}
          listInEditMode = {listInEditMode}
          onEditList = {handleEditListMode}
        />
      ))}
    </div>
  );
}

export default ListOfLists;

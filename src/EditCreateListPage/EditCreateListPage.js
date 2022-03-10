import React, { useState } from "react";
import "./EditCreateListPage.css";
import EditListTopBar from "./EditListTopBar";
import ListIconOptions from "./ListIconOptions";
import DeleteListBarFromEditPage from "./DeleteListBarFromEditPage";
import DeleteAlert from "../Global/DeleteAlert";

function EditCreateListPage(props) {
  const currentList = props.data.find(
    (list) => list.id === props.currentListId
  );
  const list = currentList ? currentList : { listName: "", listIcon: "" };

  const [tempListName, setTempListName] = useState(list.listName);
  const [tempSelectedIcon, setTempSelectedIcon] = useState(list.listIcon);

  return (
    <div id="edit-list-page">
      <div className="edit-list-header top-bar">
        <EditListTopBar
          data={props.data}
          prevPage={props.prevPage}
          onChangePage={props.onChangePage}
          currentListId={props.currentListId}
          onEditList={props.onEditList}
          onCreateList={props.onCreateList}
          onChangeList={props.onChangeList}
          tempListName={tempListName}
          tempSelectedIcon={tempSelectedIcon}
          onChangeListName={setTempListName}
          onChangeListIcon={setTempSelectedIcon}
          inEditListMode={props.inEditListMode}
          inCreateListMode={props.inCreateListMode}
        />
      </div>
      <ListIconOptions
        onChangeListIcon={setTempSelectedIcon}
        tempSelectedIcon={tempSelectedIcon}
        onEditList={props.onEditList}
        onChangePage={props.onChangePage}
      />
      {props.inEditListMode ? (
        <DeleteListBarFromEditPage
          onToggleDeleteAlert={props.onToggleDeleteAlert}
        />
      ) : null}
      {props.showDeleteAlert && <DeleteAlert
        type="this list" 
        onToggleDeleteAlert={props.onToggleDeleteAlert}
        onDelete={() => props.onDeleteList(props.currentListId)}
      />}
    </div>
  );
}

export default EditCreateListPage;

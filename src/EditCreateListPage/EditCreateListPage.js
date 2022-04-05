import React, { useState } from "react";
import "./EditCreateListPage.css";
import EditListTopBar from "./EditListTopBar";
import ListIconOptions from "./ListIconOptions";
import DeleteTaskListBar from "../Global/DeleteTaskListBar";
import DeleteAlert from "../Global/DeleteAlert";

function EditCreateListPage(props) {
  const currentList = props.data.find(
    (list) => list.id === props.currentListId
  );
  const list =
    currentList && !props.inCreateListMode
      ? currentList
      : { name: "", icon: "" };

  const [tempListName, setTempListName] = useState(list.name);
  const [tempSelectedIcon, setTempSelectedIcon] = useState(list.icon);

  return (
    <div id="edit-list-page">
      <div className="top-bar">
        <EditListTopBar
          isLargeScreen={props.isLargeScreen}
          onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
          data={props.data}
          prevPage={props.prevPage}
          onChangePage={props.onChangePage}
          currentListId={props.currentListId}
          onEditListAppearance={props.onEditListAppearance}
          onCreateList={props.onCreateList}
          tempListName={tempListName}
          tempSelectedIcon={tempSelectedIcon}
          onChangeListName={setTempListName}
          onChangeListIcon={setTempSelectedIcon}
          inEditListMode={props.inEditListMode}
          inCreateListMode={props.inCreateListMode}
          onChangeList={props.onChangeList}
        />
      </div>
      <div className="list-options">
        <ListIconOptions
          onChangeListIcon={setTempSelectedIcon}
          tempSelectedIcon={tempSelectedIcon}
          onChangePage={props.onChangePage}
        />
      </div>
      {props.inEditListMode ? (
        <DeleteTaskListBar onToggleDeleteAlert={props.onToggleDeleteAlert} />
      ) : null}
      {props.showDeleteAlert && (
        <DeleteAlert
          type="this list"
          onToggleDeleteAlert={props.onToggleDeleteAlert}
          onDelete={function () {
            props.onDeleteList(props.currentListId);
            props.isLargeScreen && props.onToggleLargeScreenPopup();
          }}
        />
      )}
    </div>
  );
}

export default EditCreateListPage;

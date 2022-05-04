import React, { useState } from "react";
import "./EditCreateListPage.css";
import EditListTopBar from "./EditListTopBar";
import ListIconOptions from "./ListIconOptions";
import DeleteTaskListBar from "../Global/DeleteTaskListBar";
import DeleteAlert from "../Global/DeleteAlert";
import ErrorAlert from "../Global/ErrorAlert";

import { useCollectionData } from "react-firebase-hooks/firestore";

function EditCreateListPage(props) {
  const tasksError = useCollectionData(props.tasksQuery)[2];

  const list = !props.inCreateListMode
    ? props.data.find((list) => list.id === props.currentListId)
    : { name: "", icon: "" };
  const isOwner = list && list.owner === props.user.uid;

  const [tempListName, setTempListName] = useState(list && list.name);
  const [tempSelectedIcon, setTempSelectedIcon] = useState(list && list.icon);

  return tasksError && !props.inCreateListMode ? (
    <ErrorAlert
      error={tasksError}
      onCreateErrorReport={props.onCreateErrorReport}
    />
  ) : (
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
      {isOwner && props.inEditListMode ? (
        <DeleteTaskListBar onToggleDeleteAlert={props.onToggleDeleteAlert} />
      ) : null}
      {props.showDeleteAlert && (
        <DeleteAlert
          type="this list"
          onToggleDeleteAlert={props.onToggleDeleteAlert}
          onDelete={() => {
            props.onDeleteList(props.currentListId);
            props.isLargeScreen && props.onToggleLargeScreenPopup();
          }}
        />
      )}
    </div>
  );
}

export default EditCreateListPage;

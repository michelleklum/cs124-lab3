import React, { Fragment, useState } from "react";
import "./LargeScreen.css";
import LargeScreenTopBar from "./LargeScreenTopBar";
import LargeScreenSideBar from "./LargeScreenSideBar";
import LargeScreenSubpage from "./LargeScreenSubpage";
import LargeScreenPopup from "./LargeScreenPopup";

import { useCollectionData } from "react-firebase-hooks/firestore";

function LargeScreenContent(props) {
  // Get tasks (current list's tasks) from Firebase
  const [dbTasks, tasksLoading, tasksError] = useCollectionData(
    props.tasksQuery
  );
  const tasks = dbTasks ? dbTasks : [];

  const [showLargeScreenPopup, setShowLargeScreenPopup] = useState(false);

  function toggleLargeScreenPopup() {
    setShowLargeScreenPopup(!showLargeScreenPopup);
  }

  const unscrollableClassName = showLargeScreenPopup ? "unscrollable" : null;

  // TODO add back search bar to both home (add HomeSearch option to side-bar) and single list page
  return (
    <Fragment>
      <LargeScreenTopBar />
      {!tasksLoading && !tasksError && (
        <div className="main-content">
          <div className={`side-bar ${unscrollableClassName}`}>
            <LargeScreenSideBar
              isLargeScreen={props.isLargeScreen}
              data={props.data}
              currentListId={props.currentListId}
              onChangePage={props.onChangePage}
              onChangeList={props.onChangeList}
              onDeleteList={props.onDeleteList}
              onToggleDeleteAlert={props.onToggleDeleteAlert}
            />
          </div>
          <div className="vertical-divider"></div>
          <div className={`large-screen-subpage ${unscrollableClassName}`}>
            <LargeScreenSubpage
              isLargeScreen={props.isLargeScreen}
              onToggleLargeScreenPopup={toggleLargeScreenPopup}
              db={props.db}
              data={props.data}
              tasksQuery={props.tasksQuery}
              prevPage={props.prevPage}
              currentListId={props.currentListId}
              currentTaskId={props.currentTaskId}
              currentPage={props.currentPage}
              onChangePage={props.onChangePage}
              onChangeTask={props.onChangeTask}
              onEditTask={props.onEditTask}
              onEditAllTaskFields={props.onEditAllTaskFields}
              onDeleteTask={props.onDeleteTask}
              onEditList={props.onEditList}
              onDeleteCompleted={props.onDeleteCompleted}
              onDeleteAllTasks={props.onDeleteAllTasks}
              onDeleteList={props.onDeleteList}
              onCreateTask={props.onCreateTask}
              onToggleDeleteAlert={props.onToggleDeleteAlert}
              showDeleteAlert={props.showDeleteAlert}
              listTasksPrimarySortField={props.listTasksPrimarySortField}
              onChangeSort={props.onChangeSort}
            />
          </div>
          {showLargeScreenPopup && props.isLargeScreen && (
            <LargeScreenPopup
              isLargeScreen={props.isLargeScreen}
              onToggleLargeScreenPopup={toggleLargeScreenPopup}
              data={props.data}
              tasks={tasks}
              currentPage={props.currentPage}
              prevPage={props.prevPage}
              currentListId={props.currentListId}
              currentTaskId={props.currentTaskId}
              onChangePage={props.onChangePage}
              onChangeList={props.onChangeList}
              onCreateTask={props.onCreateTask}
              onDeleteTask={props.onDeleteTask}
              onEditAllTaskFields={props.onEditAllTaskFields}
              onEditListAppearance={props.onEditListAppearance}
              onToggleDeleteAlert={props.onToggleDeleteAlert}
              showDeleteAlert={props.showDeleteAlert}
            />
          )}
        </div>
      )}
    </Fragment>
  );
}

export default LargeScreenContent;

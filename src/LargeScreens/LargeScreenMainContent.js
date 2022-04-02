import React, { useState } from "react";
import "./LargeScreen.css";
import SingleListPage from "../SingleListPage/SingleListPage";
import LargeScreenSideBar from "./LargeScreenSideBar";
import LargeScreenPopup from "./LargeScreenPopup";

import { useCollectionData } from "react-firebase-hooks/firestore";

function LargeScreenMainContent(props) {
  // Get tasks (current list's tasks) from Firebase
  const [dbTasks, tasksLoading, tasksError] = useCollectionData(
    props.tasksQuery
  );
  const tasks = dbTasks ? dbTasks : [];

  const [largeScreenPopup, setLargeScreenPopup] = useState(false);

  function toggleLargeScreenPopup() {
    setLargeScreenPopup(!largeScreenPopup);
  }

  const unscrollableClassName = largeScreenPopup ? "unscrollable" : null;

  // TODO add back search bar to both home (add HomeSearch option to side-bar) and single list page
  return (
    !tasksLoading &&
    !tasksError && (
      <div className="main-content">
        <div className={`side-bar ${unscrollableClassName}`}>
          <LargeScreenSideBar
            isLargeScreen={props.isLargeScreen}
            data={props.data}
            onChangePage={props.onChangePage}
            onChangeList={props.onChangeList}
            onDeleteList={props.onDeleteList}
            onToggleDeleteAlert={props.onToggleDeleteAlert}
          />
        </div>
        <div className="vertical-divider"></div>
        <div className={`large-screen-subpage ${unscrollableClassName}`}>
          {props.currentListId ? (
            <SingleListPage
              isLargeScreen={props.isLargeScreen}
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
              onToggleLargeScreenPopup={toggleLargeScreenPopup}
            />
          ) : (
            <h3 className="welcome-message">Welcome!</h3>
          )}
        </div>
        {largeScreenPopup && props.isLargeScreen && props.currentTaskId ? (
          <LargeScreenPopup
            isLargeScreen={props.isLargeScreen}
            onToggleLargeScreenPopup={toggleLargeScreenPopup}
            tasks={tasks}
            currentPage={props.currentPage}
            prevPage={props.prevPage}
            currentListId={props.currentListId}
            currentTaskId={props.currentTaskId}
            onChangePage={props.onChangePage}
            onCreateTask={props.onCreateTask}
            onDeleteTask={props.onDeleteTask}
            onEditAllTaskFields={props.onEditAllTaskFields}
            onToggleDeleteAlert={props.onToggleDeleteAlert}
            showDeleteAlert={props.showDeleteAlert}
          />
        ) : null}
      </div>
    )
  );
}

export default LargeScreenMainContent;

import React, { Fragment, useState } from "react";
import "./LargeScreenContent.css";
import LargeScreenTopBar from "./LargeScreenTopBar";
import LargeScreenSideBar from "./LargeScreenSideBar";
import LargeScreenSubpage from "./LargeScreenSubpage";
import LargeScreenPopup from "./LargeScreenPopup";
import TaskCard from "../SingleListPage/TaskCard";
import LargeScreenSearchBar from "./LargeScreenSearchBar";
import LargeScreenCancelSearch from "./LargeScreenCancelSearch";

import { useCollectionData } from "react-firebase-hooks/firestore";

const filterTasksBySearch = (tasks, query) => {
  query = query.toLowerCase();
  if (!query) {
    return tasks;
  }
  return tasks.filter((task) => {
    const taskName = task.name.toLowerCase();
    return taskName.includes(query);
  });
};

function LargeScreenContent(props) {
  // Get tasks (current list's tasks) from Firebase
  const [dbTasks, tasksLoading, tasksError] = useCollectionData(
    props.tasksQuery
  );
  const tasks = dbTasks ? dbTasks : [];

  const list = props.data.find((list) => list.id === props.currentListId);

  const tasksToShow =
    list && list.hideCompletedTasks
      ? tasks.filter((task) => !task.isCompleted)
      : tasks;

  const completedTasks = tasksToShow.filter((task) => task.isCompleted);
  const incompleteTasks = tasksToShow.filter((task) => !task.isCompleted);

  // Put incomplete tasks first, and then completed tasks.
  // Within each sublist (i.e., incomplete tasks), sort by date.
  const sortedTasksToShow = incompleteTasks.concat(completedTasks);

  const { search } = window.location;
  const query = new URLSearchParams(search).get("s");
  const [searchQuery, setSearchQuery] = useState(query || "");

  const searchFilteredTasksToShow = filterTasksBySearch(
    sortedTasksToShow,
    searchQuery
  );

  const unscrollableClassName = props.showLargeScreenPopup
    ? "unscrollable"
    : null;

  return (
    <Fragment>
      <LargeScreenTopBar />
      {props.dataLoading && (
        <div className="main-content">
          <div className={`side-bar ${unscrollableClassName}`}>
            <LargeScreenSideBar loading={props.dataLoading} />
          </div>
          <div className={`large-screen-subpage ${unscrollableClassName}`}>
            <LargeScreenSubpage loading={props.dataLoading} />
          </div>
        </div>
      )}
      {!props.dataLoading && tasksLoading && (
        <div className="main-content">
          <div className={`side-bar ${unscrollableClassName}`}>
            <LargeScreenSideBar
              isLargeScreen={props.isLargeScreen}
              onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
              data={props.data}
              currentListId={props.currentListId}
              onChangePage={props.onChangePage}
              onChangeList={props.onChangeList}
              onDeleteList={props.onDeleteList}
              onToggleDeleteAlert={props.onToggleDeleteAlert}
            />
          </div>
          <div className={`large-screen-subpage ${unscrollableClassName}`}>
            <LargeScreenSubpage loading={tasksLoading} />
          </div>
        </div>
      )}
      {!tasksLoading && !tasksError && (
        <div className="main-content">
          <div className={`side-bar ${unscrollableClassName}`}>
            <LargeScreenSideBar
              isLargeScreen={props.isLargeScreen}
              onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
              data={props.data}
              currentListId={props.currentListId}
              onChangePage={props.onChangePage}
              onChangeList={props.onChangeList}
              onDeleteList={props.onDeleteList}
              onToggleDeleteAlert={props.onToggleDeleteAlert}
              setSearchQuery={setSearchQuery}
            />
          </div>
          <div className={`large-screen-subpage ${unscrollableClassName}`}>
            {searchQuery ? (
              <Fragment>
                <div className="large-screen-filtered-tasks-header">
                  <LargeScreenSearchBar
                    listName={list.name}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                  />
                  <LargeScreenCancelSearch setSearchQuery={setSearchQuery} />
                </div>
                <div id="filtered-tasks">
                  {searchFilteredTasksToShow.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onChangePage={props.onChangePage}
                      onChangeTask={props.onChangeTask}
                    />
                  ))}
                </div>
              </Fragment>
            ) : (
              <LargeScreenSubpage
                isLargeScreen={props.isLargeScreen}
                onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
                inMenuMode={props.inMenuMode}
                menuModeType={props.menuModeType}
                setMenuModeType={props.setMenuModeType}
                onChangeMenuMode={props.onChangeMenuMode}
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
                onDeleteOverdue={props.onDeleteOverdue}
                onDeleteAllTasks={props.onDeleteAllTasks}
                onDeleteList={props.onDeleteList}
                onCreateTask={props.onCreateTask}
                onToggleDeleteAlert={props.onToggleDeleteAlert}
                showDeleteAlert={props.showDeleteAlert}
                listTasksPrimarySortField={props.listTasksPrimarySortField}
                listTasksPrimarySortDirection={
                  props.listTasksPrimarySortDirection
                }
                onChangeSort={props.onChangeSort}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            )}
          </div>
          {props.showLargeScreenPopup && props.isLargeScreen && (
            <LargeScreenPopup
              isLargeScreen={props.isLargeScreen}
              onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
              data={props.data}
              tasks={tasks}
              currentPage={props.currentPage}
              prevPage={props.prevPage}
              currentListId={props.currentListId}
              currentTaskId={props.currentTaskId}
              onChangePage={props.onChangePage}
              onChangeList={props.onChangeList}
              onCreateList={props.onCreateList}
              onDeleteList={props.onDeleteList}
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

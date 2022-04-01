import React, { Fragment, useState } from "react";
import "./SingleListPage.css";
import ListTopBar from "./ListTopBar";
import ListOfTasks from "./ListOfTasks";
import ListMenu from "./ListMenu";
import AddButton from "../Global/AddButton";
import DeleteAlert from "../Global/DeleteAlert";
import ErrorAlert from "../Global/ErrorAlert";
import SingleListLoadingPage from "../SingleListLoadingPage/SingleListLoadingPage";
import ListSearchButton from "./ListSearchButton";
import ListMenuButton from "./ListMenuButton";
import LargeScreenPopup from "../LargeScreens/LargeScreenPopup";

import { useCollectionData } from "react-firebase-hooks/firestore";

function SingleListPage(props) {
  const [inMenuMode, setMenuMode] = useState(false);
  const [menuModeType, setMenuModeType] = useState("general");
  const [deleteListAlert, setDeleteListAlert] = useState(false);
  const [deleteTasksAlert, setDeleteTasksAlert] = useState(false);
  const [deleteCompletedAlert, setDeleteCompletedAlert] = useState(false);
  const [largeScreenPopup, setLargeScreenPopup] = useState(false);

  // Get tasks (current list's tasks) from Firebase
  const [dbTasks, tasksLoading, tasksError] = useCollectionData(
    props.tasksQuery
  );
  const tasks = dbTasks ? dbTasks : [];
  const taskList = props.data.find((list) => list.id === props.currentListId);

  function toggleMenuMode() {
    setMenuMode(!inMenuMode);
    setMenuModeType("general"); // so that next time menu is opened, it will be the general menu
  }

  function toggleDeleteListAlert() {
    setDeleteListAlert(!deleteListAlert);
  }

  function toggleDeleteTasksAlert() {
    setDeleteTasksAlert(!deleteTasksAlert);
  }

  function toggleDeleteCompletedAlert() {
    setDeleteCompletedAlert(!deleteCompletedAlert);
  }

  function toggleLargeScreenPopup() {
    setLargeScreenPopup(!largeScreenPopup);
  }

  return (
    <Fragment>
      {tasksError ? (
        <Fragment>
          <SingleListLoadingPage
            data={props.data}
            currentListId={props.currentListId}
          />
          <ErrorAlert />
        </Fragment>
      ) : tasksLoading ? (
        <SingleListLoadingPage
          data={props.data}
          currentListId={props.currentListId}
          onChangePage={props.onChangePage}
        />
      ) : (
        <div>
          <div id="single-list-page">
            {props.isLargeScreen ? (
              <div className="large-screen-header">
                <h3 className="single-list-task-name">{taskList.name}</h3>
                <div className="large-screen-icons right-aligned">
                  {inMenuMode ? null : (
                    <ListSearchButton
                      isLargeScreen={props.isLargeScreen}
                      onChangePage={props.onChangePage}
                    />
                  )}
                  <ListMenuButton
                    isLargeScreen={props.isLargeScreen}
                    onChangeMenuMode={toggleMenuMode}
                  />
                  {inMenuMode && menuModeType === "general" ? (
                    <ListMenu
                      isLargeScreen={props.isLargeScreen}
                      tasks={tasks}
                      listMenuType="general"
                      onChangeMenuModeType={setMenuModeType}
                      data={props.data}
                      currentListId={props.currentListId}
                      onEditList={props.onEditList}
                      onDeleteCompleted={props.onDeleteCompleted}
                      onDeleteAllTasks={props.onDeleteAllTasks}
                      onDeleteList={props.onDeleteList}
                      onChangePage={props.onChangePage}
                      onToggleDeleteListAlert={toggleDeleteListAlert}
                      onToggleDeleteTasksAlert={toggleDeleteTasksAlert}
                      onToggleDeleteCompletedAlert={toggleDeleteCompletedAlert}
                    />
                  ) : null}
                  {inMenuMode && menuModeType === "sorting" ? (
                    <ListMenu
                      isLargeScreen={props.isLargeScreen}
                      listMenuType="sorting"
                      onChangeMenuModeType={setMenuModeType}
                      data={props.data}
                      listTasksPrimarySortField={
                        props.listTasksPrimarySortField
                      }
                      onChangeSort={props.onChangeSort}
                    />
                  ) : null}
                </div>
              </div>
            ) : (
              <ListTopBar
                data={props.data}
                currentListId={props.currentListId}
                inMenuMode={inMenuMode}
                onChangePage={props.onChangePage}
                onChangeList={props.onChangeList}
                onChangeMenuMode={toggleMenuMode}
                isLoading={false}
              />
            )}
            <AddButton
              currentPage={props.currentPage}
              onChangePage={props.onChangePage}
            />
            <div
              className={
                inMenuMode && !props.isLargeScreen
                  ? "single-list-menu-mode-overlay"
                  : null
              }
              onClick={inMenuMode ? toggleMenuMode : null}
            >
              <ListOfTasks
                db={props.db}
                tasks={tasks}
                data={props.data}
                currentListId={props.currentListId}
                inMenuMode={inMenuMode}
                onChangePage={props.onChangePage}
                onChangeTask={props.onChangeTask}
                onEditTask={props.onEditTask}
                onToggleLargeScreenPopup={toggleLargeScreenPopup}
              />
            </div>
          </div>
          {!props.isLargeScreen && inMenuMode && menuModeType === "general" ? (
            <ListMenu
              isLargeScreen={props.isLargeScreen}
              tasks={tasks}
              listMenuType="general"
              onChangeMenuModeType={setMenuModeType}
              data={props.data}
              currentListId={props.currentListId}
              onEditList={props.onEditList}
              onDeleteCompleted={props.onDeleteCompleted}
              onDeleteAllTasks={props.onDeleteAllTasks}
              onDeleteList={props.onDeleteList}
              onChangePage={props.onChangePage}
              onToggleDeleteListAlert={toggleDeleteListAlert}
              onToggleDeleteTasksAlert={toggleDeleteTasksAlert}
              onToggleDeleteCompletedAlert={toggleDeleteCompletedAlert}
            />
          ) : null}
          {!props.isLargeScreen && inMenuMode && menuModeType === "sorting" ? (
            <ListMenu
              listMenuType="sorting"
              onChangeMenuModeType={setMenuModeType}
              data={props.data}
              listTasksPrimarySortField={props.listTasksPrimarySortField}
              onChangeSort={props.onChangeSort}
            />
          ) : null}
          {deleteListAlert && (
            <DeleteAlert
              type="this list"
              onToggleDeleteAlert={toggleDeleteListAlert}
              onDelete={() => props.onDeleteList(tasks)}
            />
          )}
          {deleteTasksAlert && (
            <DeleteAlert
              type="all tasks"
              onToggleDeleteAlert={toggleDeleteTasksAlert}
              onDelete={() => props.onDeleteAllTasks(tasks)}
            />
          )}
          {deleteCompletedAlert && (
            <DeleteAlert
              type="all completed tasks"
              onToggleDeleteAlert={toggleDeleteCompletedAlert}
              onDelete={() => props.onDeleteCompleted(tasks)}
            />
          )}
        </div>
      )}
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
    </Fragment>
  );
}

export default SingleListPage;

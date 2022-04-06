import React, { Fragment, useState } from "react";
import "./SingleListPage.css";
import ListTopBar from "./ListTopBar";
import ListOfTasks from "./ListOfTasks";
import ListMenu from "./ListMenu";
import AddButton from "../Global/AddButton";
import DeleteAlert from "../Global/DeleteAlert";
import ErrorAlert from "../Global/ErrorAlert";
import SingleListLoadingPage from "../SingleListLoadingPage/SingleListLoadingPage";
import LargeScreenSubpageHeader from "../LargeScreens/LargeScreenSubpageHeader";

import { useCollectionData } from "react-firebase-hooks/firestore";

function SingleListPage(props) {
  const [inMenuMode, setMenuMode] = useState(false);
  const [menuModeType, setMenuModeType] = useState("general");
  const [deleteListAlert, setDeleteListAlert] = useState(false);
  const [deleteTasksAlert, setDeleteTasksAlert] = useState(false);
  const [deleteCompletedAlert, setDeleteCompletedAlert] = useState(false);
  const [deleteOverdueAlert, setDeleteOverdueAlert] = useState(false);

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

  function toggleDeleteOverdueAlert() {
    setDeleteOverdueAlert(!deleteOverdueAlert);
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
      ) : tasksLoading && !props.isLargeScreen ? (
        <SingleListLoadingPage
          data={props.data}
          currentListId={props.currentListId}
          onChangePage={props.onChangePage}
        />
      ) : tasksLoading && props.isLargeScreen ? null : (
        <div>
          <div id="single-list-page">
            {props.isLargeScreen ? (
              <LargeScreenSubpageHeader
                isLargeScreen={props.isLargeScreen}
                onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
                inMenuMode={inMenuMode}
                onChangeMenuMode={toggleMenuMode}
                menuModeType={menuModeType}
                onChangeMenuModeType={setMenuModeType}
                currentListId={props.currentListId}
                onEditList={props.onEditList}
                onDeleteCompleted={props.onDeleteCompleted}
                onDeleteOverdue={props.onDeleteOverdue}
                onDeleteAllTasks={props.onDeleteAllTasks}
                onDeleteList={props.onDeleteList}
                onChangePage={props.onChangePage}
                onToggleDeleteListAlert={toggleDeleteListAlert}
                onToggleDeleteTasksAlert={toggleDeleteTasksAlert}
                onToggleDeleteCompletedAlert={toggleDeleteCompletedAlert}
                onToggleDeleteOverdueAlert={toggleDeleteOverdueAlert}
                data={props.data}
                list={taskList}
                tasks={tasks}
                listTasksPrimarySortField={props.listTasksPrimarySortField}
                listTasksPrimarySortDirection={
                  props.listTasksPrimarySortDirection
                }
                onChangeSort={props.onChangeSort}
                searchQuery={props.searchQuery}
                setSearchQuery={props.setSearchQuery}
                prevPage={props.prevPage}
              />
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
            {!props.isLargeScreen && (
              <AddButton
                currentPage={props.currentPage}
                onChangePage={props.onChangePage}
                addLabel="Add New Task"
              />
            )}
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
                isLargeScreen={props.isLargeScreen}
                onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
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
              onDeleteOverdue={props.onDeleteOverdue}
              onDeleteAllTasks={props.onDeleteAllTasks}
              onDeleteList={props.onDeleteList}
              onChangePage={props.onChangePage}
              onToggleDeleteListAlert={toggleDeleteListAlert}
              onToggleDeleteTasksAlert={toggleDeleteTasksAlert}
              onToggleDeleteCompletedAlert={toggleDeleteCompletedAlert}
              onToggleDeleteOverdueAlert={toggleDeleteOverdueAlert}
            />
          ) : null}
          {!props.isLargeScreen && inMenuMode && menuModeType === "sorting" ? (
            <ListMenu
              listMenuType="sorting"
              onChangeMenuModeType={setMenuModeType}
              data={props.data}
              listTasksPrimarySortField={props.listTasksPrimarySortField}
              listTasksPrimarySortDirection={
                props.listTasksPrimarySortDirection
              }
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
          {deleteOverdueAlert && (
            <DeleteAlert
              type="all overdue tasks"
              onToggleDeleteAlert={toggleDeleteOverdueAlert}
              onDelete={() => props.onDeleteOverdue(tasks)}
            />
          )}
        </div>
      )}
    </Fragment>
  );
}

export default SingleListPage;

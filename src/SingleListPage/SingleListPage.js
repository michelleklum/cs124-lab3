import React, { Fragment, useState } from "react";
import "./SingleListPage.css";
import ListTopBar from "./ListTopBar";
import ListOfTasks from "./ListOfTasks";
import ListMenu from "./ListMenu";
import AddButton from "../Global/AddButton";
import DeleteAlert from "../Global/DeleteAlert";

function SingleListPage(props) {
  const [inMenuMode, setMenuMode] = useState(false);
  const [menuModeType, setMenuModeType] = useState("general");
  const [deleteListAlert, setDeleteListAlert] = useState(false);
  const [deleteTasksAlert, setDeleteTasksAlert] = useState(false);
  const [deleteCompletedAlert, setDeleteCompletedAlert] = useState(false);

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

  return (
    <Fragment>
      <div id="single-list-page">
        <ListTopBar
          data={props.data}
          currentListId={props.currentListId}
          inMenuMode={inMenuMode}
          onChangePage={props.onChangePage}
          onChangeList={props.onChangeList}
          onChangeMenuMode={toggleMenuMode}
        />
        <AddButton
          currentPage={props.currentPage}
          onChangePage={props.onChangePage}
        />
        <div
          id={inMenuMode ? "single-list-menu-mode-overlay" : null}
          onClick={inMenuMode ? toggleMenuMode : null}
        >
          <ListOfTasks
            db={props.db}
            tasks={props.tasks}
            data={props.data}
            currentListId={props.currentListId}
            inMenuMode={inMenuMode}
            onChangePage={props.onChangePage}
            onChangeTask={props.onChangeTask}
            onEditTask={props.onEditTask}
          />
        </div>
      </div>
      {inMenuMode && menuModeType === "general" ? (
        <ListMenu
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
          listMenuType="sorting"
          onChangeMenuModeType={setMenuModeType}
          data={props.data}
          listTasksSortField={props.listTasksSortField}
          onChangeSort={props.onChangeSort}
        />
      ) : null}
      {deleteListAlert && (
        <DeleteAlert
          type="this list"
          onToggleDeleteAlert={toggleDeleteListAlert}
          onDelete={() => props.onDeleteList()}
        />
      )}
      {deleteTasksAlert && (
        <DeleteAlert
          type="all tasks"
          onToggleDeleteAlert={toggleDeleteTasksAlert}
          onDelete={() => props.onDeleteAllTasks()}
        />
      )}
      {deleteCompletedAlert && (
        <DeleteAlert
          type="all completed tasks"
          onToggleDeleteAlert={toggleDeleteCompletedAlert}
          onDelete={() => props.onDeleteCompleted()}
        />
      )}
    </Fragment>
  );
}

export default SingleListPage;

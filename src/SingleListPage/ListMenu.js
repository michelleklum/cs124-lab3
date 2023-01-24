import { React, Fragment } from "react";
import "./ListMenu.css";
import EditListBar from "./EditListBar";
import SharingBar from "./SharingBar";
import HideCompletedBar from "./HideCompletedBar";
import SortBar from "./SortBar";
import SortByFieldBar from "./SortByFieldBar";
import SortByHeaderBar from "./SortByHeaderBar";
import DeleteCompletedBar from "./DeleteCompletedBar";
import DeleteOverdueBar from "./DeleteOverdueBar";
import DeleteAllTasksBar from "./DeleteAllTasksBar";
import DeleteListBar from "./DeleteListBar";

function ListMenu(props) {
  const taskList = props.data.find((list) => list.id === props.currentListId);
  const isOwner = taskList.owner === props.user.uid;
  const menuGridTemplateRowsClassName = isOwner
    ? "owner-menu-grid-template-rows"
    : "non-owner-menu-grid-template-rows";
  const screenSizeClassName = props.isLargeScreen
    ? "large-screen-list-menu"
    : "small-screen-list-menu";

  return (
    <Fragment>
      {props.listMenuType === "general" && (
        <div
          className={`single-list-page-menu general-menu ${menuGridTemplateRowsClassName} ${screenSizeClassName}`}
        >
          <EditListBar
            taskList={taskList}
            onChangePage={props.onChangePage}
            isLargeScreen={props.isLargeScreen}
            onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
          />
          <SharingBar
            taskList={taskList}
            onChangePage={props.onChangePage}
            isLargeScreen={props.isLargeScreen}
            onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
          />
          <HideCompletedBar
            taskList={taskList}
            hideCompletedTasks={taskList.hideCompletedTasks}
            currentListId={props.currentListId}
            onEditList={props.onEditList}
          />
          <SortBar
            taskList={taskList}
            onChangeMenuModeType={props.onChangeMenuModeType}
          />
          <DeleteOverdueBar
            taskList={taskList}
            onDeleteOverdue={props.onDeleteOverdue}
            onToggleDeleteOverdueAlert={props.onToggleDeleteOverdueAlert}
          />
          <DeleteCompletedBar
            taskList={taskList}
            onDeleteCompleted={props.onDeleteCompleted}
            onToggleDeleteCompletedAlert={props.onToggleDeleteCompletedAlert}
          />
          <DeleteAllTasksBar
            taskList={taskList}
            onToggleDeleteTasksAlert={props.onToggleDeleteTasksAlert}
          />
          {isOwner && (
            <DeleteListBar
              taskList={taskList}
              onToggleDeleteListAlert={props.onToggleDeleteListAlert}
            />
          )}
        </div>
      )}
      {props.listMenuType === "sorting" && (
        <div
          className={`single-list-page-menu sorting-menu ${screenSizeClassName}`}
        >
          <SortByHeaderBar
            taskList={taskList}
            onChangeMenuModeType={props.onChangeMenuModeType}
          />
          <SortByFieldBar
            taskList={taskList}
            onChangeSort={props.onChangeSort}
            listTasksPrimarySortField={props.listTasksPrimarySortField}
            listTasksPrimarySortDirection={props.listTasksPrimarySortDirection}
            barSortIcon="fas fa-exclamation-circle"
            barSortFieldAbbrev="priority"
            barSortField="priority"
            barSortFieldText="priority"
          />
          <SortByFieldBar
            taskList={taskList}
            onChangeSort={props.onChangeSort}
            listTasksPrimarySortField={props.listTasksPrimarySortField}
            listTasksPrimarySortDirection={props.listTasksPrimarySortDirection}
            barSortIcon="fas fa-hourglass-start"
            barSortFieldAbbrev="deadline"
            barSortField="deadline"
            barSortFieldText="deadline"
          />
          <SortByFieldBar
            taskList={taskList}
            onChangeSort={props.onChangeSort}
            listTasksPrimarySortField={props.listTasksPrimarySortField}
            listTasksPrimarySortDirection={props.listTasksPrimarySortDirection}
            barSortIcon="fas fa-sort-alpha-down"
            barSortFieldAbbrev="name"
            barSortField="nameLowercasedForSorting"
            barSortFieldText="name"
          />
          <SortByFieldBar
            taskList={taskList}
            onChangeSort={props.onChangeSort}
            listTasksPrimarySortField={props.listTasksPrimarySortField}
            listTasksPrimarySortDirection={props.listTasksPrimarySortDirection}
            barSortIcon="fas fa-calendar-plus"
            barSortFieldAbbrev="creation-time"
            barSortField="creationTime"
            barSortFieldText="creation time"
          />
          <SortByFieldBar
            taskList={taskList}
            onChangeSort={props.onChangeSort}
            listTasksPrimarySortField={props.listTasksPrimarySortField}
            listTasksPrimarySortDirection={props.listTasksPrimarySortDirection}
            barSortIcon="fas fa-calendar-check"
            barSortFieldAbbrev="modified-time"
            barSortField="modifiedTime"
            barSortFieldText="modification time"
          />
        </div>
      )}
    </Fragment>
  );
}

export default ListMenu;

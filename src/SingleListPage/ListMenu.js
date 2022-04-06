import { Fragment } from "react";
import "./ListMenu.css";
import EditListBar from "./EditListBar";
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
  const screenSizeClassName = props.isLargeScreen
    ? "large-screen-list-menu"
    : "small-screen-list-menu";

  return (
    <Fragment>
      {props.listMenuType === "general" && (
        <div
          className={`single-list-page-menu general-menu ${screenSizeClassName}`}
        >
          <EditListBar
            onChangePage={props.onChangePage}
            isLargeScreen={props.isLargeScreen}
            onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
          />
          <HideCompletedBar
            hideCompletedTasks={taskList.hideCompletedTasks}
            currentListId={props.currentListId}
            onEditList={props.onEditList}
          />
          <SortBar onChangeMenuModeType={props.onChangeMenuModeType} />
          <DeleteCompletedBar
            onDeleteCompleted={props.onDeleteCompleted}
            onToggleDeleteCompletedAlert={props.onToggleDeleteCompletedAlert}
          />
          <DeleteOverdueBar
            onDeleteOverdue={props.onDeleteOverdue}
            onToggleDeleteOverdueAlert={props.onToggleDeleteOverdueAlert}
          />
          <DeleteAllTasksBar
            onToggleDeleteTasksAlert={props.onToggleDeleteTasksAlert}
          />
          <DeleteListBar
            onToggleDeleteListAlert={props.onToggleDeleteListAlert}
          />
        </div>
      )}
      {props.listMenuType === "sorting" && (
        <div
          className={`single-list-page-menu sorting-menu ${screenSizeClassName}`}
        >
          <SortByHeaderBar onChangeMenuModeType={props.onChangeMenuModeType} />
          <SortByFieldBar
            onChangeSort={props.onChangeSort}
            listTasksPrimarySortField={props.listTasksPrimarySortField}
            barSortIcon="fas fa-exclamation-circle"
            barSortFieldAbbrev="priority"
            barSortField="priority"
            barSortFieldText="priority"
          />
          <SortByFieldBar
            onChangeSort={props.onChangeSort}
            listTasksPrimarySortField={props.listTasksPrimarySortField}
            barSortIcon="fas fa-hourglass-start"
            barSortFieldAbbrev="deadline"
            barSortField="deadline"
            barSortFieldText="deadline"
          />
          <SortByFieldBar
            onChangeSort={props.onChangeSort}
            listTasksPrimarySortField={props.listTasksPrimarySortField}
            barSortIcon="fas fa-sort-alpha-down"
            barSortFieldAbbrev="name"
            barSortField="nameLowercasedForSorting"
            barSortFieldText="name"
          />
          <SortByFieldBar
            onChangeSort={props.onChangeSort}
            listTasksPrimarySortField={props.listTasksPrimarySortField}
            barSortIcon="fas fa-calendar-plus"
            barSortFieldAbbrev="creation-time"
            barSortField="creationTime"
            barSortFieldText="creation time"
          />
          <SortByFieldBar
            onChangeSort={props.onChangeSort}
            listTasksPrimarySortField={props.listTasksPrimarySortField}
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

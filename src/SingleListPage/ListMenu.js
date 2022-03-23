import { Fragment } from "react";
import "./ListMenu.css";
import EditListBar from "./EditListBar";
import HideCompletedBar from "./HideCompletedBar";
import SortBar from "./SortBar";
import SortByHeaderBar from "./SortByHeaderBar";
import SortByDeadlineBar from "./SortByDeadlineBar";
import SortByNameBar from "./SortByNameBar";
import SortByPriorityBar from "./SortByPriorityBar";
import SortByCreationTimeBar from "./SortByCreationTimeBar";
import SortByModificationTimeBar from "./SortByModificationTimeBar";
import DeleteCompletedBar from "./DeleteCompletedBar";
import DeleteAllTasksBar from "./DeleteAllTasksBar";
import DeleteListBar from "./DeleteListBar";

function ListMenu(props) {
  const taskList = props.data.find((list) => list.id === props.currentListId);

  return (
    <Fragment>
      {props.listMenuType === "general" && (
        <div className="single-list-page-menu general-menu-grid">
          <EditListBar onChangePage={props.onChangePage} />
          <HideCompletedBar
            hideCompletedTasks={taskList.hideCompletedTasks}
            currentListId={props.currentListId}
            onEditList={props.onEditList}
          />
          <SortBar onChangeMenuModeType={props.onChangeMenuModeType} />
          <DeleteCompletedBar
            currentListId={props.currentListId}
            onDeleteCompleted={props.onDeleteCompleted}
            onToggleDeleteCompletedAlert={props.onToggleDeleteCompletedAlert}
          />
          <DeleteAllTasksBar
            currentListId={props.currentListId}
            onToggleDeleteTasksAlert={props.onToggleDeleteTasksAlert}
          />
          <DeleteListBar
            currentListId={props.currentListId}
            onToggleDeleteListAlert={props.onToggleDeleteListAlert}
          />
        </div>
      )}
      {props.listMenuType === "sorting" && (
        <div className="single-list-page-menu sorting-menu-grid">
          <SortByHeaderBar onChangeMenuModeType={props.onChangeMenuModeType} />
          <SortByDeadlineBar
            onChangeSort={props.onChangeSort}
            listTasksPrimarySortField={props.listTasksPrimarySortField}
          />
          <SortByNameBar
            onChangeSort={props.onChangeSort}
            listTasksPrimarySortField={props.listTasksPrimarySortField}
          />
          <SortByPriorityBar
            onChangeSort={props.onChangeSort}
            listTasksPrimarySortField={props.listTasksPrimarySortField}
          />
          <SortByCreationTimeBar
            onChangeSort={props.onChangeSort}
            listTasksPrimarySortField={props.listTasksPrimarySortField}
          />
          <SortByModificationTimeBar
            onChangeSort={props.onChangeSort}
            listTasksPrimarySortField={props.listTasksPrimarySortField}
          />
        </div>
      )}
    </Fragment>
  );
}

export default ListMenu;

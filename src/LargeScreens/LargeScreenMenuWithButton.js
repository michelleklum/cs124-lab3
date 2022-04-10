import React, { Fragment } from "react";
import ListMenuButton from "../SingleListPage/ListMenuButton";
import ListMenu from "../SingleListPage/ListMenu";

function LargeScreenMenuWithButton(props) {
  return (
    <Fragment>
      <ListMenuButton
        isLargeScreen={props.isLargeScreen}
        taskList={props.taskList}
        inMenuMode={props.inMenuMode}
        onChangeMenuMode={props.onChangeMenuMode}
      />
      {props.inMenuMode && props.menuModeType === "general" ? (
        <ListMenu
          isLargeScreen={props.isLargeScreen}
          onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
          tasks={props.tasks}
          listMenuType="general"
          onChangeMenuModeType={props.onChangeMenuModeType}
          data={props.data}
          currentListId={props.currentListId}
          onEditList={props.onEditList}
          onDeleteCompleted={props.onDeleteCompleted}
          onDeleteOverdue={props.onDeleteOverdue}
          onDeleteAllTasks={props.onDeleteAllTasks}
          onDeleteList={props.onDeleteList}
          onChangePage={props.onChangePage}
          onToggleDeleteListAlert={props.onToggleDeleteListAlert}
          onToggleDeleteTasksAlert={props.onToggleDeleteTasksAlert}
          onToggleDeleteCompletedAlert={props.onToggleDeleteCompletedAlert}
          onToggleDeleteOverdueAlert={props.onToggleDeleteOverdueAlert}
        />
      ) : null}
      {props.inMenuMode && props.menuModeType === "sorting" ? (
        <ListMenu
          isLargeScreen={props.isLargeScreen}
          listMenuType="sorting"
          onChangeMenuModeType={props.onChangeMenuModeType}
          data={props.data}
          currentListId={props.currentListId}
          listTasksPrimarySortField={props.listTasksPrimarySortField}
          listTasksPrimarySortDirection={props.listTasksPrimarySortDirection}
          onChangeSort={props.onChangeSort}
        />
      ) : null}
    </Fragment>
  );
}

export default LargeScreenMenuWithButton;

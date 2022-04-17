import React, { Fragment } from "react";
import "./LargeScreenSubpageHeader.css";
import FocusTrap from "focus-trap-react";
import LargeScreenSearchBar from "./LargeScreenSearchBar";
import LargeScreenAddButton from "./LargeScreenAddButton";
import LargeScreenMenuWithButton from "./LargeScreenMenuWithButton";

function LargeScreenSubpageHeader(props) {
  return (
    <div className="large-screen-header">
      <h3 className="single-list-name">{props.list && props.list.name}</h3>
      <div className="large-screen-icons right-aligned">
        {props.inMenuMode ? null : (
          <Fragment>
            <LargeScreenSearchBar
              listName={props.list && props.list.name}
              onChangePage={props.onChangePage}
              searchQuery={props.searchQuery}
              setSearchQuery={props.setSearchQuery}
              prevPage={props.prevPage}
            />
            <LargeScreenAddButton
              onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
              onChangePage={props.onChangePage}
              addType="task"
            />
          </Fragment>
        )}
        {props.inMenuMode ? (
          <FocusTrap>
            <div>
              <LargeScreenMenuWithButton
                isLargeScreen={props.isLargeScreen}
                onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
                data={props.data}
                currentListId={props.currentListId}
                taskList={props.list}
                tasks={props.tasks}
                inMenuMode={props.inMenuMode}
                onChangeMenuMode={props.onChangeMenuMode}
                menuModeType={props.menuModeType}
                onChangeMenuModeType={props.onChangeMenuModeType}
                onEditList={props.onEditList}
                onDeleteCompleted={props.onDeleteCompleted}
                onDeleteOverdue={props.onDeleteOverdue}
                onDeleteAllTasks={props.onDeleteAllTasks}
                onDeleteList={props.onDeleteList}
                onChangePage={props.onChangePage}
                onToggleDeleteListAlert={props.onToggleDeleteListAlert}
                onToggleDeleteTasksAlert={props.onToggleDeleteTasksAlert}
                onToggleDeleteCompletedAlert={
                  props.onToggleDeleteCompletedAlert
                }
                onToggleDeleteOverdueAlert={props.onToggleDeleteOverdueAlert}
                listTasksPrimarySortField={props.listTasksPrimarySortField}
                listTasksPrimarySortDirection={
                  props.listTasksPrimarySortDirection
                }
                onChangeSort={props.onChangeSort}
              />
            </div>
          </FocusTrap>
        ) : (
          <LargeScreenMenuWithButton
            isLargeScreen={props.isLargeScreen}
            onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
            data={props.data}
            currentListId={props.currentListId}
            taskList={props.list}
            tasks={props.tasks}
            inMenuMode={props.inMenuMode}
            onChangeMenuMode={props.onChangeMenuMode}
            onChangeMenuModeType={props.onChangeMenuModeType}
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
            listTasksPrimarySortField={props.listTasksPrimarySortField}
            listTasksPrimarySortDirection={props.listTasksPrimarySortDirection}
            onChangeSort={props.onChangeSort}
          />
        )}
      </div>
    </div>
  );
}

export default LargeScreenSubpageHeader;

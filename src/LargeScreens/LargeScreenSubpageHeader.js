import React, { Fragment } from "react";
import "./LargeScreenSubpageHeader.css";
import FocusTrap from "focus-trap-react";
import LargeScreenSearchBar from "./LargeScreenSearchBar";
import LargeScreenAddButton from "./LargeScreenAddButton";
import ListMenuButton from "../SingleListPage/ListMenuButton";
import ListMenu from "../SingleListPage/ListMenu";

function LargeScreenSubpageHeader(props) {
  return (
    <div className="large-screen-header">
      <h3 className="single-list-name">{props.list.name}</h3>
      <div className="large-screen-icons right-aligned">
        {props.inMenuMode ? null : (
          <Fragment>
            <LargeScreenSearchBar
              listName={props.list.name}
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
        <FocusTrap>
          <div>
            <ListMenuButton
              isLargeScreen={props.isLargeScreen}
              taskList={props.list}
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
                onToggleDeleteCompletedAlert={
                  props.onToggleDeleteCompletedAlert
                }
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
                listTasksPrimarySortDirection={
                  props.listTasksPrimarySortDirection
                }
                onChangeSort={props.onChangeSort}
              />
            ) : null}
          </div>
        </FocusTrap>
      </div>
    </div>
  );
}

export default LargeScreenSubpageHeader;

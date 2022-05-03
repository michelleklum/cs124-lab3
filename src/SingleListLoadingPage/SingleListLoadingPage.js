import React, { Fragment } from "react";
import ListTopBar from "../SingleListPage/ListTopBar";
import ListMenu from "../SingleListPage/ListMenu";

function SingleListLoadingPage(props) {
  return (
    <Fragment>
      <div id="single-list-page">
        <ListTopBar
          data={props.data}
          currentListId={props.currentListId}
          onChangePage={props.onChangePage}
          isLoading={true}
        />
        {!props.isLargeScreen &&
        props.inMenuMode &&
        props.menuModeType === "general" ? (
          <ListMenu
            isLargeScreen={props.isLargeScreen}
            tasks={[]}
            listMenuType="general"
            onChangeMenuModeType={props.setMenuModeType}
            user={props.user}
            data={props.data}
            currentListId={props.currentListId}
            onEditList={props.onEditList}
          />
        ) : null}
        {!props.isLargeScreen &&
        props.inMenuMode &&
        props.menuModeType === "sorting" ? (
          <ListMenu
            listMenuType="sorting"
            onChangeMenuModeType={props.setMenuModeType}
            user={props.user}
            data={props.data}
            currentListId={props.currentListId}
            listTasksPrimarySortField={props.listTasksPrimarySortField}
            listTasksPrimarySortDirection={props.listTasksPrimarySortDirection}
            onChangeSort={props.onChangeSort}
          />
        ) : null}
        <div
          className={props.inMenuMode ? "single-list-menu-mode-overlay" : null}
        ></div>
      </div>
    </Fragment>
  );
}

export default SingleListLoadingPage;

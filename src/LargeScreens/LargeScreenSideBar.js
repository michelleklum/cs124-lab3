import React, { Fragment } from "react";
import Home from "../Home/Home";
import LargeScreenSideBarHeader from "./LargeScreenSideBarHeader";

function LargeScreenSideBar(props) {
  return (
    <Fragment>
      <LargeScreenSideBarHeader
        onChangePage={props.onChangePage}
        onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
      />
      {!props.loading && (
        <Home
          isLargeScreen={props.isLargeScreen}
          user={props.user}
          data={props.data}
          currentListId={props.currentListId}
          onChangePage={props.onChangePage}
          onChangeList={props.onChangeList}
          onChangeTask={props.onChangeTask}
          onDeleteList={props.onDeleteList}
          onToggleDeleteAlert={props.onToggleDeleteAlert}
          setSearchQuery={props.setSearchQuery}
        />
      )}
    </Fragment>
  );
}

export default LargeScreenSideBar;

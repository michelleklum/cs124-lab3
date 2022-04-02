import React, { Fragment } from "react";
import Home from "../Home/Home";
import LargeScreenSideBarHeader from "./LargeScreenSideBarHeader";

function LargeScreenSideBar(props) {
  return (
    <Fragment>      
    <LargeScreenSideBarHeader/>
    <Home
      isLargeScreen={props.isLargeScreen}
      data={props.data}
      currentListId={props.currentListId}
      onChangePage={props.onChangePage}
      onChangeList={props.onChangeList}
      onDeleteList={props.onDeleteList}
      onToggleDeleteAlert={props.onToggleDeleteAlert}
    />
    </Fragment>
  );
}

export default LargeScreenSideBar;
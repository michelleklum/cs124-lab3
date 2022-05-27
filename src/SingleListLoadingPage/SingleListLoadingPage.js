import React, { Fragment } from "react";
import ListTopBar from "../SingleListPage/ListTopBar";

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
      </div>
    </Fragment>
  );
}

export default SingleListLoadingPage;

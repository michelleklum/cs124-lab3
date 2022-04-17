import { React, Fragment } from "react";
import "./HomeTopBar.css";
import HomeSearchButton from "./HomeSearchButton";
import SignOutButton from "../Authentication/SignOutButton";

function HomeTopBar(props) {
  return (
    <div className="top-bar" id="home-top-bar">
      <div className="top-bar-content">
        <div className="logo small-screen-logo">
          {!props.isNarrowScreen && (
            <img
              src={require("../Global/header_task_monster.png")}
              width="210"
              height="55"
              alt="Task Monster"
              aria-label="Task Monster Logo"
            />
          )}
          {props.isNarrowScreen && (
            <img
              src={require("../Global/logo_task_monster.png")}
              width="34"
              height="42"
              alt="Task Monster"
              className="narrow-logo"
              aria-label="Task Monster Logo"
            />
          )}
        </div>
        <div className="right-aligned">
          {!props.isLoading && (
            <Fragment>
              <SignOutButton
                auth={props.auth}
                onChangePage={props.onChangePage}
              />
              <HomeSearchButton onChangePage={props.onChangePage} />
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeTopBar;

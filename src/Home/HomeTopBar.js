import { React } from "react";
import "./HomeTopBar.css";
import HomeSearchButton from "./HomeSearchButton";
import HomeAccountButton from "./HomeAccountButton";

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
            <div className="top-bar-buttons">
              <HomeAccountButton
                auth={props.auth}
                onChangePage={props.onChangePage}
                onChangeList={props.onChangeList}
                onChangeTask={props.onChangeTask}
              />
              <HomeSearchButton onChangePage={props.onChangePage} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeTopBar;

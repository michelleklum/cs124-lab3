import "./HomeTopBar.css";
import HomeSearchButton from "./HomeSearchButton";

function HomeTopBar(props) {
  return (
    <div className="top-bar" id="home-top-bar">
      <div className="top-bar-content">
        <div className="logo small-screen-logo">
          {!props.isNarrowScreen &&
          <img
            src={require("../Global/header_task_monster.png")}
            width="210"
            height="55"
            alt="Task Monster"
          />}
          {props.isNarrowScreen &&
          <img
            src={require("../Global/logo_task_monster.png")}
            width="34"
            height="42"
            alt="Task Monster"
            className="narrow-logo"
          />}
        </div>
        <div className="right-aligned">
          {!props.isLoading && (
            <HomeSearchButton onChangePage={props.onChangePage} />
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeTopBar;

import "./HomeTopBar.css";
import HomeSearchButton from "./HomeSearchButton";

function HomeTopBar(props) {
  return (
    <div className="top-bar" id="home-top-bar">
      <div className="top-bar-content">
        <div className="logo">
          <img src={require("./header_task_monster.png")} width="210"
            height="55" alt="Task Monster" />
        </div>
        <div className="right-aligned">
          <HomeSearchButton onChangePage={props.onChangePage} />
        </div>
      </div>
    </div>
  );
}

export default HomeTopBar;

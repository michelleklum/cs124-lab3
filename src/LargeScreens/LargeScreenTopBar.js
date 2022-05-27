import "./LargeScreenTopBar.css";
import HomeAccountButton from "../Home/HomeAccountButton";

function LargeScreenTopBar(props) {
  return (
    <div className="top-bar" id="home-top-bar-large-screen">
      <div className="top-bar-content">
        <div className="logo">
          <img
            src={require("../Global/header_task_monster.png")}
            width="210"
            height="55"
            alt="Task Monster"
          />
        </div>
        <div className="right-aligned">
          <HomeAccountButton
            onChangePage={props.onChangePage}
            isLargeScreen={props.isLargeScreen}
            onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
          />
        </div>
      </div>
    </div>
  );
}

export default LargeScreenTopBar;

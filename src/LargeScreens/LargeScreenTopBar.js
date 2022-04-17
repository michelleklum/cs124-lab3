import "./LargeScreenTopBar.css";
import SignOutButton from "../Authentication/SignOutButton";

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
      </div>
      <SignOutButton auth={props.auth} onChangePage={props.onChangePage} />
    </div>
  );
}

export default LargeScreenTopBar;

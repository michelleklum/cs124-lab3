import "./LargeScreenTopBar.css";

function LargeScreenTopBar() {
  return (
    <div className="top-bar" id="home-top-bar">
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
    </div>
  );
}

export default LargeScreenTopBar;

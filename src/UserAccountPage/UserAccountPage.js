import "./UserAccountPage.css";
import UserAccountPageTopBar from "./UserAccountPageTopBar";
import SignOutButton from "./SignOutButton";

function UserAccountPage(props) {
  return (
    <div id="user-account-page">
      <div className="top-bar">
        <UserAccountPageTopBar
          onChangePage={props.onChangePage}
          prevPage={props.prevPage}
        />
      </div>
      <h3>Email:
        <span className="user-email">
          {" " + props.user.email}
        </span>
      </h3>
      <SignOutButton
        user={props.user}
        auth={props.auth}
        onChangePage={props.onChangePage}
        onChangeList={props.onChangeList}
        onChangeTask={props.onChangeTask} />
    </div>
  );
}

export default UserAccountPage;


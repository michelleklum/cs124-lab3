import "./ListTopBar.css";
import ListBackButton from "./ListBackButton";
import ListSearchButton from "./ListSearchButton";
import ListMenuButton from "./ListMenuButton";

function ListTopBar(props) {
  const taskList = props.data.find((list) => list.id === props.currentListId);

  return (
    <div className="top-bar">
      <div className="list-top-bar-content">
        <div className="left-aligned">
          <ListBackButton
            onChangePage={props.onChangePage}
            inMenuMode={props.inMenuMode}
          />
          <h2>{taskList.name}</h2>
        </div>
        <div className="right-aligned list-icons">
          {props.inMenuMode || props.isLoading ? null : (
            <ListSearchButton
              taskList={taskList}
              onChangePage={props.onChangePage}
            />
          )}
          {!props.isLoading && (
            <ListMenuButton
              taskList={taskList}
              inMenuMode={props.inMenuMode}
              onChangeMenuMode={props.onChangeMenuMode}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ListTopBar;

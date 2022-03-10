import "./ListTopBar.css";
import ListBackButton from "./ListBackButton";
import ListSearchButton from "./ListSearchButton";
import ListMenuButton from "./ListMenuButton";

function ListTopBar(props) {
  const taskList = props.data.find((list) => list.id === props.currentListId);

  return (
    <div className="top-bar">
      <div className="top-bar-content">
        <div className="left-aligned">
          <ListBackButton onChangePage={props.onChangePage} />
          <h2>{taskList.listName}</h2>
        </div>
        <div className="right-aligned">
          {props.inMenuMode ? null : (
            <ListSearchButton onChangePage={props.onChangePage} onChangeList={props.onChangeList} />
          )}
          <ListMenuButton onChangeMenuMode={props.onChangeMenuMode} />
        </div>
      </div>
    </div>
  );
}

export default ListTopBar;

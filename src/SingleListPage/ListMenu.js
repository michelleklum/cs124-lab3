import "./ListMenu.css";
import EditListBar from "./EditListBar";
import HideCompletedBar from "./HideCompletedBar";
import DeleteCompletedBar from "./DeleteCompletedBar";
import DeleteAllTasksBar from "./DeleteAllTasksBar";
import DeleteListBar from "./DeleteListBar";

function ListMenu(props) {
  const taskList = props.data.find((list) => list.id === props.currentListId);

  return (
    <div className="delete-toolbar-edit-list-menu">
      <EditListBar onChangePage={props.onChangePage} />
      <HideCompletedBar
        areCompletedTasksHidden={taskList.areCompletedTasksHidden}
        currentListId={props.currentListId}
        onEditList={props.onEditList}
      />
      <DeleteCompletedBar
        currentListId={props.currentListId}
        onDeleteCompleted={props.onDeleteCompleted}
        onToggleDeleteCompletedAlert={props.onToggleDeleteCompletedAlert}
      />
      <DeleteAllTasksBar
        currentListId={props.currentListId}
        onToggleDeleteTasksAlert={props.onToggleDeleteTasksAlert}
      />
      <DeleteListBar
        currentListId={props.currentListId}
        onToggleDeleteListAlert={props.onToggleDeleteListAlert}
      />
    </div>
  );
}

export default ListMenu;

import "./LargeScreenPopup.css";
import ViewEditCreateTaskPage from "../ViewEditCreateTaskPage/ViewEditCreateTaskPage";

function LargeScreenPopup(props) {
  return (
    <div className="large-screen-popup-page-background">
      <div className="overlay"></div>
      <div className="popup">
        {props.currentPage === "ViewTaskPage" ? (
          <ViewEditCreateTaskPage
            isLargeScreen={props.isLargeScreen}
            tasks={props.tasks}
            prevPage={props.prevPage}
            currentListId={props.currentListId}
            currentTaskId={props.currentTaskId}
            onChangePage={props.onChangePage}
            inEditTaskMode={false}
            inCreateTaskMode={false}
          />
        ) : null}
        {props.currentPage === "EditTaskPage" ? (
          <ViewEditCreateTaskPage
            isLargeScreen={props.isLargeScreen}
            tasks={props.tasks}
            prevPage={props.prevPage}
            currentListId={props.currentListId}
            currentTaskId={props.currentTaskId}
            onChangePage={props.onChangePage}
            onCreateTask={props.onCreateTask}
            onDeleteTask={props.onDeleteTask}
            onEditAllTaskFields={props.onEditAllTaskFields}
            inEditTaskMode={true}
            inCreateTaskMode={false}
            onToggleDeleteAlert={props.onToggleDeleteAlert}
            showDeleteAlert={props.showDeleteAlert}
            onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
          />
        ) : null}
      </div>
    </div>
  );
}

export default LargeScreenPopup;

import "./TaskTopBar.css";
import CancelEditTaskButton from "./CancelEditTaskButton";
import TaskBackButton from "./TaskBackButton";
import EditTaskNameInput from "./EditTaskNameInput";
import SaveTaskButton from "./SaveTaskButton";
import EditTaskButton from "./EditTaskButton";

function TaskTopBar(props) {
  return (
    <div className="task-header">
      {props.inEditTaskMode || props.inCreateTaskMode ? (
        <CancelEditTaskButton
          tempTaskName={props.tempTaskName}
          isLargeScreen={props.isLargeScreen}
          onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
          onChangePage={props.onChangePage}
          prevPage={props.prevPage}
        />
      ) : (
        <TaskBackButton
          data={props.data}
          currentListId={props.currentListId}
          isLargeScreen={props.isLargeScreen}
          onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
          onChangePage={props.onChangePage}
        />
      )}
      {props.inEditTaskMode || props.inCreateTaskMode ? (
        <EditTaskNameInput
          currentListId={props.currentListId}
          tempTaskName={props.tempTaskName}
          onChangeTaskName={props.onChangeTaskName}
        />
      ) : (
        <h2 id="task-name-h2">{props.tempTaskName}</h2>
      )}
      {props.inEditTaskMode || props.inCreateTaskMode ? (
        <SaveTaskButton
          isLargeScreen={props.isLargeScreen}
          onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
          currentListId={props.currentListId}
          currentTaskId={props.currentTaskId}
          prevPage={props.prevPage}
          inEditTaskMode={props.inEditTaskMode}
          inCreateTaskMode={props.inCreateTaskMode}
          onChangePage={props.onChangePage}
          onEditAllTaskFields={props.onEditAllTaskFields}
          onCreateTask={props.onCreateTask}
          tempTaskName={props.tempTaskName}
          tempTaskDeadline={props.tempTaskDeadline}
          tempTaskNotes={props.tempTaskNotes}
          tempTaskStatus={props.tempTaskStatus}
          tempTaskPriority={props.tempTaskPriority}
        />
      ) : (
        <EditTaskButton
          tempTaskName={props.tempTaskName}
          onChangePage={props.onChangePage}
        />
      )}
    </div>
  );
}

export default TaskTopBar;

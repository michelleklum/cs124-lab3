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
          onChangePage={props.onChangePage}
          prevPage={props.prevPage}
          initialData={props.initialData}
        />
      ) : (
        <TaskBackButton onChangePage={props.onChangePage} />
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
          currentListId={props.currentListId}
          currentTaskId={props.currentTaskId}
          prevPage={props.prevPage}
          inEditTaskMode={props.inEditTaskMode}
          inCreateTaskMode={props.inCreateTaskMode}
          onChangePage={props.onChangePage}
          onEditAllTaskFields={props.onEditAllTaskFields}
          onCreateTask={props.onCreateTask}
          taskName={props.tempTaskName}
          taskDate={props.tempTaskDate}
          taskTime={props.tempTaskTime}
          taskNotes={props.tempTaskNotes}
          taskStatus={props.tempTaskStatus}
        />
      ) : (
        <EditTaskButton
          onChangePage={props.onChangePage}
          taskName={props.tempTaskName}
          taskDate={props.tempTaskDate}
        />
      )}
    </div>
  );
}

export default TaskTopBar;

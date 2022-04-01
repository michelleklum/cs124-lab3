import "./ListOfTasks.css";
import TaskCard from "./TaskCard";

function ListOfTasks(props) {
  const list = props.data.find((list) => list.id === props.currentListId);

  const completedTasks = props.tasks.filter((task) => task.isCompleted);
  const incompleteTasks = props.tasks.filter((task) => !task.isCompleted);

  // Put incomplete tasks first, and then completed tasks.
  // Within each sublist (i.e., incomplete tasks), sort by date.
  return (
    <div id="list-of-tasks">
      {completedTasks.length > 0 && incompleteTasks.length === 0 && (
        <h3 className="all-completed-message">
          You've completed all your tasks!
        </h3>
      )}
      {completedTasks.length === 0 && incompleteTasks.length === 0 && (
        <h3 className="empty-message">No Tasks</h3>
      )}
      {incompleteTasks.map((task) => (
        <TaskCard
          key={task.id}
          currentListId={props.currentListId}
          task={task}
          inMenuMode={props.inMenuMode}
          onChangePage={props.onChangePage}
          onChangeTask={props.onChangeTask}
          onEditTask={props.onEditTask}
          onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
        />
      ))}
      {!list.hideCompletedTasks && completedTasks.length > 0 && (
        <div>
          <hr />
          <h3 className="completed-tasks-header">Completed</h3>
          {completedTasks.map((task) => (
            <TaskCard
              key={task.id}
              currentListId={props.currentListId}
              task={task}
              inMenuMode={props.inMenuMode}
              onChangePage={props.onChangePage}
              onChangeTask={props.onChangeTask}
              onEditTask={props.onEditTask}
              onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ListOfTasks;

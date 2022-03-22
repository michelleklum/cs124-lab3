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
      {incompleteTasks.map((task) => (
        <TaskCard
          key={task.id}
          currentListId={props.currentListId}
          task={task}
          inMenuMode={props.inMenuMode}
          onChangePage={props.onChangePage}
          onChangeTask={props.onChangeTask}
          onEditTask={props.onEditTask}
        />
      ))}
      {!list.hideCompletedTasks && completedTasks.length > 0 && <div>
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
          />
        ))}
      </div>}
    </div>
  );
}

export default ListOfTasks;

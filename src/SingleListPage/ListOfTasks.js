import "./ListOfTasks.css";
import TaskCard from "./TaskCard";
import { collection, query, doc } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

function ListOfTasks(props) {
  const list = props.data.find((list) => list.id === props.currentListId);
  const tasksToShow = list.hideCompletedTasks
    ? props.tasks.filter((task) => !task.isCompleted)
    : props.tasks;

  const completedTasks = tasksToShow.filter((task) => task.isCompleted);
  const incompleteTasks = tasksToShow.filter((task) => !task.isCompleted);

  // Put incomplete tasks first, and then completed tasks.
  // Within each sublist (i.e., incomplete tasks), sort by date.
  const sortedTasksToShow = incompleteTasks
    .sort(sortTasksByDateCompareFunction)
    .concat(completedTasks.sort(sortTasksByDateCompareFunction));

  function sortTasksByDateCompareFunction(a, b) {
    return new Date(a.taskDate) < new Date(b.taskDate) ? -1 : 1;
  }

  return (
    <div id="list-of-tasks">
      {sortedTasksToShow.map((task) => (
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
    </div>
  );
}

export default ListOfTasks;

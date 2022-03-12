import "./ListSearchPage.css";
import React, { Fragment, useState } from "react";
import ListSearchBar from "./ListSearchBar";
import TaskCard from "../SingleListPage/TaskCard";

const filterTasksBySearch = (tasks, query) => {
  query = query.toLowerCase();
  if (!query) {
    return tasks;
  }
  return tasks.filter((task) => {
    const taskName = task.name.toLowerCase();
    return taskName.includes(query);
  });
};

function ListSearchPage(props) {
  const list = props.data.find((list) => list.id === props.currentListId);

  const tasksToShow = list.hideCompletedTasks
    ? list.tasks.filter((task) => !task.isCompleted)
    : list.tasks;

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

  const { search } = window.location;
  const query = new URLSearchParams(search).get("s");
  const [searchQuery, setSearchQuery] = useState(query || "");

  const searchFilteredTasksToShow = filterTasksBySearch(
    sortedTasksToShow,
    searchQuery
  );

  return (
    <Fragment>
      <ListSearchBar
        onChangePage={props.onChangePage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        id={list.id}
        prevPage={props.prevPage}
      />
      <div id="filtered-tasks">
        {searchFilteredTasksToShow.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onChangePage={props.onChangePage}
            onChangeTask={props.onChangeTask}
          />
        ))}
      </div>
    </Fragment>
  );
}

export default ListSearchPage;

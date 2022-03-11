import React, { Fragment, useState } from "react";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import "./App.css";
import Home from "./Home/Home";
import HomeSearchPage from "./HomeSearchPage/HomeSearchPage";
import ListSearchPage from "./ListSearchPage/ListSearchPage";
import SingleListPage from "./SingleListPage/SingleListPage";
import ViewEditCreateTaskPage from "./ViewEditCreateTaskPage/ViewEditCreateTaskPage";
import EditCreateListPage from "./EditCreateListPage/EditCreateListPage";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKewQsnli_uTJBwznWaTf3Xu9umZFfyIw",
  authDomain: "cs124-lab3-9c4c8.firebaseapp.com",
  projectId: "cs124-lab3-9c4c8",
  storageBucket: "cs124-lab3-9c4c8.appspot.com",
  messagingSenderId: "228399726961",
  appId: "1:228399726961:web:8de7dc7c45ca93cbebf6d0",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
console.log(db);

function App(props) {
  const [data, setData] = useState(props.initialData);

  function handleEditTask(listId, taskId, taskField, newValue) {
    setData(
      data.map((list) =>
        list.id === listId
          ? {
              ...list,
              listTasks: list.listTasks.map((task) =>
                task.id === taskId ? { ...task, [taskField]: newValue } : task
              ),
            }
          : list
      )
    );
  }

  function handleEditTaskAllFields(
    listId,
    taskId,
    taskName,
    taskDate,
    taskTime,
    taskNotes,
    taskStatus
  ) {
    setData(
      data.map((list) =>
        list.id === listId
          ? {
              ...list,
              listTasks: list.listTasks.map((task) =>
                task.id === taskId
                  ? {
                      ...task,
                      taskName: taskName,
                      taskDate: taskDate,
                      taskTime: taskTime,
                      taskNotes: taskNotes,
                      isTaskCompleted: taskStatus,
                    }
                  : task
              ),
            }
          : list
      )
    );
  }

  function handleDeleteTask(listId, taskId) {
    setData(
      data.map((list) =>
        list.id === listId
          ? {
              ...list,
              listTasks: list.listTasks.filter((task) => task.id !== taskId),
            }
          : list
      )
    );
    setCurrentPage(
      "SingleListPage"
    ); /* after deleting task, redirect to Single List Page */
  }

  function handleEditList(listId, listField, newValue) {
    setData(
      data.map((list) =>
        list.id === listId ? { ...list, [listField]: newValue } : list
      )
    );
  }

  function handleEditListAppearance(listId, newName, newIcon) {
    setData(
      data.map((list) =>
        list.id === listId
          ? { ...list, listName: newName, listIcon: newIcon }
          : list
      )
    );
  }

  function handleDeleteCompletedTasks(listId) {
    setData(
      data.map((list) =>
        list.id === listId
          ? {
              ...list,
              listTasks: list.listTasks.filter((task) => !task.isTaskCompleted),
            }
          : list
      )
    );
  }

  function handleDeleteAllTasks(listId) {
    setData(
      data.map((list) =>
        list.id === listId ? { ...list, listTasks: [] } : list
      )
    );
  }

  function handleDeleteList(listId) {
    setData(data.filter((list) => list.id !== listId));
    setCurrentPage("Home"); /* after deleting list, redirect to Home Page */
  }

  // Code below changes current/previous page, list, and task
  const [currentPage, setCurrentPage] = useState("Home");
  const [prevPage, setPrevPage] = useState("Home");
  const [currentListId, setCurrentListId] = useState();
  const [currentTaskId, setCurrentTaskId] = useState();

  function handleChangePage(newPage) {
    setPrevPage(currentPage);
    setCurrentPage(newPage);
    if (newPage === "Home") {
      handleChangeList(null);
    } else if (newPage === "SingleListPage") {
      handleChangeTask(null);
    }
  }

  function handleChangeList(newListId) {
    setCurrentListId(newListId);
  }

  function handleChangeTask(newTaskId) {
    setCurrentTaskId(newTaskId);
  }

  // Functions below handle list and task creation
  function handleCreateList(listName, listIcon) {
    const newList = {
      id: generateUniqueID(),
      listName: listName,
      listIcon: listIcon,
      areCompletedTasksHidden: false,
      listTasks: [],
    };
    const newData = data.concat(newList);
    setData(newData);
  }

  function handleCreateTask(listId, taskName, taskDate, taskTime, taskNotes) {
    const list = data.find((list) => list.id === listId);
    const id = generateUniqueID();
    const newTasks = list.listTasks.concat({
      id: id,
      taskName: taskName,
      taskDate: taskDate,
      taskTime: taskTime,
      taskNotes: taskNotes,
      isTaskCompleted: false,
    });
    setData(
      data.map((list) =>
        list.id === listId ? { ...list, listTasks: newTasks } : list
      )
    );
  }

  // State and functions below handle alerts and warnings
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  function handleToggleDeleteAlert() {
    setShowDeleteAlert(!showDeleteAlert);
  }

  return (
    <Fragment>
      {currentPage === "Home" ? (
        <Home
          data={data}
          currentListId={currentListId}
          currentTaskId={currentTaskId}
          currentPage={currentPage}
          onDeleteList={handleDeleteList}
          onChangePage={handleChangePage}
          onChangeList={handleChangeList}
          onCreateTask={handleCreateList}
          onToggleDeleteAlert={handleToggleDeleteAlert}
          showDeleteAlert={showDeleteAlert}
        />
      ) : null}
      {currentPage === "HomeSearchPage" ? (
        <HomeSearchPage
          data={data}
          prevPage={prevPage}
          currentListId={currentListId}
          currentTaskId={currentTaskId}
          onChangePage={handleChangePage}
          onChangeList={handleChangeList}
          onChangeTask={handleChangeTask}
          onDeleteList={handleDeleteList}
          onToggleDeleteAlert={handleToggleDeleteAlert}
          showDeleteAlert={showDeleteAlert}
        />
      ) : null}
      {currentPage === "SingleListPage" ? (
        <SingleListPage
          data={data}
          prevPage={prevPage}
          currentListId={currentListId}
          currentTaskId={currentTaskId}
          currentPage={currentPage}
          onChangePage={handleChangePage}
          onChangeTask={handleChangeTask}
          onEditList={handleEditList}
          onEditTask={handleEditTask}
          onDeleteCompleted={handleDeleteCompletedTasks}
          onDeleteAllTasks={handleDeleteAllTasks}
          onDeleteList={handleDeleteList}
          onCreateTask={handleChangeTask}
          onToggleDeleteAlert={handleToggleDeleteAlert}
        />
      ) : null}
      {currentPage === "ListSearchPage" ? (
        <ListSearchPage
          data={data}
          prevPage={prevPage}
          currentListId={currentListId}
          currentTaskId={currentTaskId}
          onChangePage={handleChangePage}
          onChangeTask={handleChangeTask}
        />
      ) : null}
      {currentPage === "ViewTaskPage" ? (
        <ViewEditCreateTaskPage
          data={data}
          prevPage={prevPage}
          currentListId={currentListId}
          currentTaskId={currentTaskId}
          onChangePage={handleChangePage}
          inEditTaskMode={false}
          inCreateTaskMode={false}
        />
      ) : null}
      {currentPage === "EditTaskPage" ? (
        <ViewEditCreateTaskPage
          data={data}
          prevPage={prevPage}
          currentListId={currentListId}
          currentTaskId={currentTaskId}
          onChangePage={handleChangePage}
          onCreateTask={handleCreateTask}
          onDeleteTask={handleDeleteTask}
          onEditAllTaskFields={handleEditTaskAllFields}
          inEditTaskMode={true}
          inCreateTaskMode={false}
          onToggleDeleteAlert={handleToggleDeleteAlert}
          showDeleteAlert={showDeleteAlert}
        />
      ) : null}
      {currentPage === "CreateTaskPage" ? (
        <ViewEditCreateTaskPage
          data={data}
          prevPage={prevPage}
          currentListId={currentListId}
          currentTaskId={currentTaskId}
          onChangePage={handleChangePage}
          onDeleteTask={handleDeleteTask}
          onCreateTask={handleCreateTask}
          onEditAllTaskFields={handleEditTaskAllFields}
          inEditTaskMode={false}
          inCreateTaskMode={true}
        />
      ) : null}
      {currentPage === "EditListPage" ? (
        <EditCreateListPage
          data={data}
          prevPage={prevPage}
          currentListId={currentListId}
          onEditList={handleEditListAppearance}
          onChangePage={handleChangePage}
          onChangeList={handleChangeList}
          onDeleteList={handleDeleteList}
          onCreateList={handleCreateList}
          inEditListMode={true}
          inCreateListMode={false}
          onToggleDeleteAlert={handleToggleDeleteAlert}
          showDeleteAlert={showDeleteAlert}
        />
      ) : null}
      {currentPage === "CreateListPage" ? (
        <EditCreateListPage
          data={data}
          prevPage={prevPage}
          currentListId={currentListId}
          onEditList={handleEditListAppearance}
          onCreateList={handleCreateList}
          onChangeList={handleChangeList}
          onChangePage={handleChangePage}
          onDeleteList={handleDeleteList}
          inEditListMode={false}
          inCreateListMode={true}
        />
      ) : null}
    </Fragment>
  );
}

export default App;

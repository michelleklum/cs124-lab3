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
import {
  getFirestore,
  query,
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

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

function App(props) {
  const listCollectionName = "lists";
  const taskSubcollectionName = "tasks";

  const listsQuery = query(collection(db, listCollectionName));
  const [dbData, dataLoading, dataError] = useCollectionData(listsQuery);
  const data = dbData ? dbData : [];

  function handleEditTask(listId, taskId, taskField, newValue) {
    /*
    setData(
      data.map((list) =>
        list.id === listId
          ? { dt,
              tasks: list.tasks.map((task) =>
                task.id === taskId ? { ...task, [taskField]: newValue } : task
              ),
            }
          : list
      )
    );
    */
  }

  function handleEditTaskAllFields(
    listId,
    taskId,
    taskName,
    taskDate,
    taskTime,
    notes,
    taskStatus
  ) {
    /*
    setData(
      data.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === taskId
                  ? {
                      ...task,
                      name: taskName,
                      taskDate: taskDate,
                      taskTime: taskTime,
                      notes: notes,
                      isCompleted: taskStatus,
                    }
                  : task
              ),
            }
          : list
      )
    );
    */
  }

  function handleDeleteTask(listId, taskId) {
    /*
    setData(
      data.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.filter((task) => task.id !== taskId),
            }
          : list
      )
    );
    */
    setCurrentPage(
      "SingleListPage"
    ); /* after deleting task, redirect to Single List Page */
  }

  // TODO: CONSOLIDATE EDIT LIST FUNCTIONS!!!!!!
  // TODO: test showing / hiding completed items once we have tasks
  function handleEditList(listId, listField, newValue) {
    const listDocRef = doc(db, listCollectionName, listId);
    updateDoc(listDocRef, {
      modifiedTime: serverTimestamp(),
      [listField]: newValue,
    });
  }

  function handleEditListAppearance(listId, newName, newIcon) {
    const listDocRef = doc(db, listCollectionName, listId);
    updateDoc(listDocRef, {
      modifiedTime: serverTimestamp(),
      name: newName,
      icon: newIcon,
    });
  }

  function handleDeleteCompletedTasks(listId) {
    // setData(
    //   data.map((list) =>
    //     list.id === listId
    //       ? {
    //           ...list,
    //           tasks: list.tasks.filter((task) => !task.isCompleted),
    //         }
    //       : list
    //   )
    // );
  }

  function handleDeleteAllTasks(listId) {
    // setData(
    //   data.map((list) =>
    //     list.id === listId ? { ...list, tasks: [] } : list
    //   )
    // );
  }

  function handleDeleteList(listId) {
    deleteDoc(doc(db, listCollectionName, listId));
    setCurrentPage("Home"); /* after deleting list, redirect to Home Page */
  }

  // Code below changes current/previous page, list, and task
  const [currentPage, setCurrentPage] = useState("Home");
  const [prevPage, setPrevPage] = useState("Home");
  const [currentListId, setCurrentListId] = useState();
  const [currentTaskId, setCurrentTaskId] = useState();

  const taskDocRef = currentTaskId
    ? doc(db, "lists", currentListId, "tasks", currentTaskId)
    : null;
  // const taskQuery = query(taskDocRef);
  // const [dbTask, taskLoading, taskError] = useCollectionData(taskQuery);

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
  function handleCreateList(name, icon) {
    const listId = generateUniqueID();
    const newList = {
      id: listId,
      creationTime: serverTimestamp(),
      modifiedTime: serverTimestamp(),
      name: name,
      icon: icon,
      hideCompletedTasks: false,
    };
    setDoc(doc(db, listCollectionName, listId), newList);
  }

  function handleCreateTask(listId, taskName, taskDate, taskTime, taskNotes) {
    const taskId = generateUniqueID();
    const newTask = {
      id: taskId,
      creationTime: serverTimestamp(),
      modifiedTime: serverTimestamp(),
      name: taskName,
      deadline: serverTimestamp(), // TODO: change to actual deadline
      notes: taskNotes,
      isCompleted: false,
    };
    const docRef = doc(
      db,
      listCollectionName,
      listId,
      taskSubcollectionName,
      taskId
    );
    console.log(docRef);
    setDoc(docRef, newTask);
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
          db={db}
          prevPage={prevPage}
          currentListId={currentListId}
          currentTaskId={currentTaskId}
          currentPage={currentPage}
          onChangePage={handleChangePage}
          onChangeTask={handleChangeTask}
          onEditTask={handleEditTask}
          onEditList={handleEditList}
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
          dbTask={dbTask}
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
          db={db}
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
          db={db}
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

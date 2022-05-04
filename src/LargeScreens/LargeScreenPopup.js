import "./LargeScreenPopup.css";
import ViewEditCreateTaskPage from "../ViewEditCreateTaskPage/ViewEditCreateTaskPage";
import EditCreateListPage from "../EditCreateListPage/EditCreateListPage";
import SharingPage from "../Sharing/SharingPage";
import UserAccountPage from "../UserAccountPage/UserAccountPage";
import FocusTrap from "focus-trap-react";

function LargeScreenPopup(props) {
  return (
    <FocusTrap>
      <div className="large-screen-popup-page-background">
        <div className="overlay"></div>
        <div className="popup">
          {props.currentPage === "ViewTaskPage" ? (
            <ViewEditCreateTaskPage
              tasksQuery={props.tasksQuery}
              isLargeScreen={props.isLargeScreen}
              onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
              tasks={props.tasks}
              prevPage={props.prevPage}
              data={props.data}
              currentListId={props.currentListId}
              currentTaskId={props.currentTaskId}
              onChangePage={props.onChangePage}
              inEditTaskMode={false}
              inCreateTaskMode={false}
            />
          ) : null}
          {props.currentPage === "EditTaskPage" ? (
            <ViewEditCreateTaskPage
              tasksQuery={props.tasksQuery}
              isLargeScreen={props.isLargeScreen}
              onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
              tasks={props.tasks}
              prevPage={props.prevPage}
              data={props.data}
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
            />
          ) : null}
          {props.currentPage === "CreateTaskPage" ? (
            <ViewEditCreateTaskPage
              tasksQuery={props.tasksQuery}
              isLargeScreen={props.isLargeScreen}
              onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
              tasks={props.tasks}
              prevPage={props.prevPage}
              data={props.data}
              currentListId={props.currentListId}
              onChangePage={props.onChangePage}
              onCreateTask={props.onCreateTask}
              onDeleteTask={props.onDeleteTask}
              onEditAllTaskFields={props.onEditAllTaskFields}
              inEditTaskMode={false}
              inCreateTaskMode={true}
              onToggleDeleteAlert={props.onToggleDeleteAlert}
              showDeleteAlert={props.showDeleteAlert}
            />
          ) : null}
          {props.currentPage === "EditListPage" ? (
            <EditCreateListPage
              tasksQuery={props.tasksQuery}
              isLargeScreen={props.isLargeScreen}
              onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
              user={props.user}
              data={props.data}
              prevPage={props.prevPage}
              currentListId={props.currentListId}
              onEditListAppearance={props.onEditListAppearance}
              onChangePage={props.onChangePage}
              onChangeList={props.onChangeList}
              onDeleteList={props.onDeleteList}
              onCreateList={props.onCreateList}
              inEditListMode={true}
              inCreateListMode={false}
              onToggleDeleteAlert={props.onToggleDeleteAlert}
              showDeleteAlert={props.showDeleteAlert}
              onCreateErrorReport={props.onCreateErrorReport}
            />
          ) : null}
          {props.currentPage === "CreateListPage" ? (
            <EditCreateListPage
              tasksQuery={props.tasksQuery}
              isLargeScreen={props.isLargeScreen}
              onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
              user={props.user}
              data={props.data}
              prevPage={props.prevPage}
              currentListId={props.currentListId}
              onEditListAppearance={props.onEditListAppearance}
              onCreateList={props.onCreateList}
              onChangePage={props.onChangePage}
              onChangeList={props.onChangeList}
              onDeleteList={props.onDeleteList}
              inEditListMode={false}
              inCreateListMode={true}
              onCreateErrorReport={props.onCreateErrorReport}
            />
          ) : null}
          {props.currentPage === "SharingPage" ? (
            <SharingPage
              tasksQuery={props.tasksQuery}
              isLargeScreen={props.isLargeScreen}
              user={props.user}
              data={props.data}
              prevPage={props.prevPage}
              currentListId={props.currentListId}
              onChangePage={props.onChangePage}
              onEditList={props.onEditList}
              onCreateErrorReport={props.onCreateErrorReport}
            />
          ) : null}
          {props.currentPage === "UserAccountPage" ? (
            <UserAccountPage
              isLargeScreen={props.isLargeScreen}
              onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
              onChangePage={props.onChangePage}
              user={props.user}
              auth={props.auth}
              onChangeList={props.onChangeList}
              onChangeTask={props.onChangeTask}
              prevPage={props.prevPage}
            />
          ) : null}
        </div>
      </div>
    </FocusTrap>
  );
}

export default LargeScreenPopup;

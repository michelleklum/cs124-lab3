import "./LargeScreenPopup.css";
import ViewEditCreateTaskPage from "../ViewEditCreateTaskPage/ViewEditCreateTaskPage";
import EditCreateListPage from "../EditCreateListPage/EditCreateListPage";

function LargeScreenPopup(props) {
  return (
    <div className="large-screen-popup-page-background">
      <div className="overlay"></div>
      <div className="popup">
        {props.currentPage === "ViewTaskPage" ? (
          <ViewEditCreateTaskPage
            isLargeScreen={props.isLargeScreen}
            onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
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
            onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
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
          />
        ) : null}
        {props.currentPage === "EditListPage" ? (
          <EditCreateListPage
            isLargeScreen={props.isLargeScreen}
            onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
            data={props.data}
            prevPage={props.prevPage}
            currentListId={props.currentListId}
            onEditListAppearance={props.onEditListAppearance}
            onChangePage={props.onChangePage}
            onDeleteList={props.onDeleteList}
            onCreateList={props.onCreateList}
            inEditListMode={true}
            inCreateListMode={false}
            onToggleDeleteAlert={props.onToggleDeleteAlert}
            showDeleteAlert={props.showDeleteAlert}
          />
        ) : null}
        {props.currentPage === "CreateListPage" ? (
          <EditCreateListPage
            isLargeScreen={props.isLargeScreen}
            onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
            data={props.data}
            prevPage={props.prevPage}
            currentListId={props.currentListId}
            onEditListAppearance={props.onEditListAppearance}
            onCreateList={props.onCreateList}
            onChangePage={props.onChangePage}
            onDeleteList={props.onDeleteList}
          />
        ) : null}
      </div>
    </div>
  );
}

export default LargeScreenPopup;

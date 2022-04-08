import SingleListPage from "../SingleListPage/SingleListPage";

function LargeScreenSubpage(props) {
  return props.currentListId ? (
    <SingleListPage
      isLargeScreen={props.isLargeScreen}
      onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
      inMenuMode={props.inMenuMode}
      menuModeType={props.menuModeType}
      setMenuModeType={props.setMenuModeType}
      onChangeMenuMode={props.onChangeMenuMode}
      db={props.db}
      data={props.data}
      tasksQuery={props.tasksQuery}
      prevPage={props.prevPage}
      currentListId={props.currentListId}
      currentTaskId={props.currentTaskId}
      currentPage={props.currentPage}
      onChangePage={props.onChangePage}
      onChangeTask={props.onChangeTask}
      onEditTask={props.onEditTask}
      onEditAllTaskFields={props.onEditAllTaskFields}
      onDeleteTask={props.onDeleteTask}
      onEditList={props.onEditList}
      onDeleteCompleted={props.onDeleteCompleted}
      onDeleteOverdue={props.onDeleteOverdue}
      onDeleteAllTasks={props.onDeleteAllTasks}
      onDeleteList={props.onDeleteList}
      onCreateTask={props.onCreateTask}
      onToggleDeleteAlert={props.onToggleDeleteAlert}
      showDeleteAlert={props.showDeleteAlert}
      listTasksPrimarySortField={props.listTasksPrimarySortField}
      listTasksPrimarySortDirection={props.listTasksPrimarySortDirection}
      onChangeSort={props.onChangeSort}
      searchQuery={props.searchQuery}
      setSearchQuery={props.setSearchQuery}
    />
  ) : !props.loading ? (
    <div className="welcome">
      <div className="welcome-vertical-divider"></div>
      <img
        src={require("../Global/welcome_screen_task_monster.png")}
        alt="Task Monster Welcome Logo"
        className="welcome-logo"
      />
    </div>
  ) : null;
}

export default LargeScreenSubpage;

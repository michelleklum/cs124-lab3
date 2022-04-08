function CancelEditTaskButton(props) {
  function handleClick() {
    // when user cancels changes to task on EditTaskPage, they should return to SingleListPage,
    // not the prevPage (which would be ViewTaskPage)
    props.onChangePage("SingleListPage");
    props.isLargeScreen && props.onToggleLargeScreenPopup();
  }

  return (
    <button
      className="cancel-edit-task-button"
      onClick={handleClick}
      aria-label={`Cancel changes to current task: ${props.tempTaskName}`}
    >
      <i className="fas fa-times fa-4x"></i>
    </button>
  );
}

export default CancelEditTaskButton;

function CancelEditTaskButton(props) {
  function handleClick() {
    props.onChangePage(props.prevPage);
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

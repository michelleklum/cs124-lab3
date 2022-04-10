function TaskBackButton(props) {
  const list = props.data.find((list) => list.id === props.currentListId);

  function handleClick() {
    props.onChangePage("SingleListPage");
    props.isLargeScreen && props.onToggleLargeScreenPopup();
  }

  return (
    <button
      className="task-back-button"
      onClick={handleClick}
      aria-label={`Return to list of all tasks for current list: ${list.name}`}
    >
      <i className="fas fa-chevron-left fa-4x"></i>
    </button>
  );
}

export default TaskBackButton;

function CancelEditTaskButton(props) {
  function handleCancelEditTask() {
    props.onChangePage(props.prevPage);
    props.isLargeScreen && props.onToggleLargeScreenPopup();
  }
  return <i className="fas fa-times fa-4x" onClick={handleCancelEditTask}></i>;
}

export default CancelEditTaskButton;

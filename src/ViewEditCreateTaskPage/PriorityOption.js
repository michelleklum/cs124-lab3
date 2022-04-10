function PriorityOption(props) {
  function handleClick() {
    props.onChangeTaskPriority(props.taskPriorityLevel);
  }

  return (
    <button
      className={
        props.selectedTaskPriority === props.taskPriorityLevel
          ? "priority-option selected-priority selected-" +
            props.priorityLevels.get(props.taskPriorityLevel).toLowerCase()
          : "priority-option unselected-priority"
      }
      onClick={handleClick}
      aria-label={`Task is currently set to priority level ${props.priorityLevels.get(
        props.selectedTaskPriority
      )}. Set priority level to ${props.priorityLevels.get(
        props.taskPriorityLevel
      )}`}
    >
      <p>{props.priorityLevels.get(props.taskPriorityLevel)}</p>
    </button>
  );
}
export default PriorityOption;

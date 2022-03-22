function PriorityOption(props) {
    return (
        <p className={props.selectedTaskPriority ===
            props.taskPriorityLevel ?
            "selected-priority priority-option"
            : "unselected-priority priority-option"}
            onClick={() =>
                props.onChangeTaskPriority(props.taskPriorityLevel)}>
            {props.priorityLevels.get(props.taskPriorityLevel)}</p>
    )
}
export default PriorityOption 
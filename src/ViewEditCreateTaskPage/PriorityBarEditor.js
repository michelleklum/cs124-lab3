import PriorityOption from "./PriorityOption";
import "./PriorityBarEditor.css";

function PriorityBarEditor(props) {
    const priorityOptions = [0, 1, 2, 3]

    return (
        <div className={[
            "set-priority", "priority-options",
            props.openDatePicker || props.openTimePicker
                ? "set-priority-picker-open"
                : "set-priority-picker-closed",
        ].join(" ")}>
            {priorityOptions.map((priority) => (
                <PriorityOption
                    selectedTaskPriority={props.tempTaskPriority}
                    taskPriorityLevel={priority}
                    priorityLevels={props.priorityLevels}
                    onChangeTaskPriority={props.onChangeTaskPriority}
                    key={priority} />
            ))}
        </div>
    );
}

export default PriorityBarEditor;

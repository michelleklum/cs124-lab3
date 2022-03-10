function ListIcon(props) {
    return (
        <div className={props.tempSelectedIcon === props.iconName ?
            "selected"
            : "unselected"} onClick ={() => props.onChangeListIcon(props.iconName)}>
            <i className={`fas fa-${props.iconName} fa-4x list-icon`}></i>
        </div>
    )
}
export default ListIcon 
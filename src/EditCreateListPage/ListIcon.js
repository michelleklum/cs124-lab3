function ListIcon(props) {
    return (
        <div className={props.tempSelectedIcon === props.iconName ?
            "selected"
            : "unselected"}
            onClick={() => props.onChangeListIcon(props.iconName)}
            aria-label={props.iconName + ", icon option"}
            tabIndex="0"
            role="button"
            onKeyDown={(e) => (e.code === "Enter") ? props.onChangeListIcon(props.iconName) : null}>
            <i className={`fas fa-${props.iconName} fa-4x list-icon`}></i>
        </div>
    )
}
export default ListIcon 
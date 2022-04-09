function ListIcon(props) {
    return (
        <button className={props.tempSelectedIcon === props.iconName ?
            "icon selected"
            : "icon unselected"}
            onClick={() => props.onChangeListIcon(props.iconName)}
            aria-label={props.iconName + ", icon option"}>
            <i className={`fas fa-${props.iconName} fa-4x list-icon`}></i>
        </button>
    )
}
export default ListIcon 
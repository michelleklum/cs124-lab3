function ConfirmEditListButton(props) {
    function confirmEdit() {
        props.onEditList(props.currentListId,
            props.listName,
            props.listIcon)
    }

    function confirmCreateList() {
        props.onCreateList(props.listName,
            props.listIcon)
    }

    return (
        <div>
            {props.inEditListMode && (props.listName !== "") && (props.listIcon !== "") &&
                <div className="right-aligned">
                    <i className="fas fa-check fa-4x"
                        onClick={() => confirmEdit()}></i>
                </div>}
            {props.inEditListMode && (props.listName === "" || props.listIcon === "") &&
                <div className="right-aligned">
                    <i className="fas fa-check fa-4x" id="no-info"></i>
                </div>}
            {props.inCreateListMode && (props.listName !== "") && (props.listIcon !== "") &&
                <div className="right-aligned create-mode-confirm">
                    <i className="fas fa-check fa-4x"
                        onClick={() => confirmCreateList()}></i>
                </div>}
            {props.inCreateListMode && (props.listName === "" || props.listIcon === "") &&
                <div className="right-aligned">
                    <i className="fas fa-check fa-4x" id="no-info"></i>
                </div>}
        </div>
    )
}

export default ConfirmEditListButton;

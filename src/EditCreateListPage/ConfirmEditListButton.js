import React, { useState } from "react";

function ConfirmEditListButton(props) {
    const [confirmInProgress, setConfirmInProgress] = useState(false);

    function confirmEdit() {
        setConfirmInProgress(true);
        props.onEditList(props.currentListId,
            props.listName,
            props.listIcon);
    }

    function confirmCreateList() {
        setConfirmInProgress(true);
        props.onCreateList(props.listName,
            props.listIcon);
    }

    return (
        <div>
            {confirmInProgress &&
                <div className="right-aligned">
                    <i className="fas fa-check fa-4x" id="no-info"></i>
                </div>}
            {!confirmInProgress && props.inEditListMode && (props.listName !== "") && (props.listIcon !== "") &&
                <div className="right-aligned">
                    <i className="fas fa-check fa-4x"
                        onClick={() => confirmEdit()}></i>
                </div>}
            {!confirmInProgress && props.inEditListMode && (props.listName === "" || props.listIcon === "") &&
                <div className="right-aligned">
                    <i className="fas fa-check fa-4x" id="no-info"></i>
                </div>}
            {!confirmInProgress && props.inCreateListMode && (props.listName !== "") && (props.listIcon !== "") &&
                <div className="right-aligned create-mode-confirm">
                    <i className="fas fa-check fa-4x"
                        onClick={() => confirmCreateList()}></i>
                </div>}
            {!confirmInProgress && props.inCreateListMode && (props.listName === "" || props.listIcon === "") &&
                <div className="right-aligned">
                    <i className="fas fa-check fa-4x" id="no-info"></i>
                </div>}
        </div>
    )
}

export default ConfirmEditListButton;

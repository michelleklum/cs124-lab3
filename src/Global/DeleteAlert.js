import "./DeleteAlert.css";
 
function DeleteAlert(props) {
    return (
        <div className={"backdrop"}>
            <div className="alert">
                <h3 className="alert-description">
                    Are you sure you want to delete {props.type}?
                </h3>
                <div className="alert-buttons">
                    <div className={"alert-button alert-cancel"} type={"button"}
                        onClick={() => props.onToggleDeleteAlert()}>
                        Cancel
                    </div>
                    <div className={"alert-button alert-delete"} type={"button"}
                        onClick={() => {
                            props.onDelete();
                            props.onToggleDeleteAlert();
                        }}>
                        Delete
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteAlert;


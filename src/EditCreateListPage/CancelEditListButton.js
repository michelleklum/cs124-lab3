import "./CancelEditListButton.css";

function CancelEditListButton(props) {
    return (
        <div className="left-aligned">
            <i className="fas fa-times fa-5x cancel-edit-list"
                onClick={() => props.onChangePage(props.prevPage)}></i>
        </div>
    );
}

export default CancelEditListButton;

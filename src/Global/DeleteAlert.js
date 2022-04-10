import "./DeleteAlert.css";
import FocusTrap from "focus-trap-react";

function DeleteAlert(props) {
  function handleDelete() {
    props.onDelete();
    props.onToggleDeleteAlert();
  }

  return (
    <FocusTrap>
      <div className="backdrop">
        <div className="alert">
          <h3 className="alert-description">
            Are you sure you want to delete {props.type}?
          </h3>
          <div className="alert-buttons">
            <button
              className={"alert-button alert-cancel"}
              type={"button"}
              onClick={() => props.onToggleDeleteAlert()}
              aria-label="Cancel Delete"
            >
              Cancel
            </button>
            <button
              className={"alert-button alert-delete"}
              type={"button"}
              onClick={handleDelete}
              aria-label="Confirm Delete"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default DeleteAlert;

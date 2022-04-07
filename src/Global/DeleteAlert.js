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
            <div
              className={"alert-button alert-cancel"}
              type={"button"}
              onClick={() => props.onToggleDeleteAlert()}
              aria-label="Cancel Delete"
              tabIndex="0"
              role="button"
              onKeyDown={(e) =>
                e.code === "Enter" ? props.onToggleDeleteAlert() : null
              }
            >
              Cancel
            </div>
            <div
              className={"alert-button alert-delete"}
              type={"button"}
              onClick={handleDelete}
              aria-label="Confirm Delete"
              tabIndex="0"
              role="button"
              onKeyDown={(e) => (e.code === "Enter" ? handleDelete() : null)}
            >
              Delete
            </div>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default DeleteAlert;

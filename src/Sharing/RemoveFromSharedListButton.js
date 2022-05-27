function RemoveFromSharedListButton(props) {
  return (
    <button
      className="sharing-button"
      onClick={() => props.onToggleRemoveFromSharedListAlert()}
      aria-label={"Remove me from shared list"}
    >
      Remove Me From Shared List
    </button>
  );
}

export default RemoveFromSharedListButton;

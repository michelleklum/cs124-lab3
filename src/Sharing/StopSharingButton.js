function StopSharingButton(props) {
  return (
    <button
      className="sharing-button"
      onClick={() => props.onToggleStopSharingAlert()}
      aria-label={"Stop sharing list"}
    >
      Stop Sharing
    </button>
  );
}

export default StopSharingButton;

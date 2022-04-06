import LargeScreenAddButton from "./LargeScreenAddButton";

function LargeScreenSideBarHeader(props) {
  return (
    <div className="sidebar-header">
      <h2 className="sidebar-header-text"
      aria-label = "Your Lists">Your Lists</h2>
      <LargeScreenAddButton
        onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
        addType="list"
        onChangePage={props.onChangePage}
      />
    </div>
  );
}

export default LargeScreenSideBarHeader;

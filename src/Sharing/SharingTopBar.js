import "./SharingTopBar.css";
import SharingBackButton from "./SharingBackButton";

function SharingTopBar(props) {
  const taskList = props.data.find((list) => list.id === props.currentListId);

  return (
    <div className="top-bar">
      <div className="sharing-header-content">
        <SharingBackButton
          isLargeScreen={props.isLargeScreen}
          onToggleLargeScreenPopup={props.onToggleLargeScreenPopup}
          onChangePage={props.onChangePage}
          prevPage={props.prevPage}
        />
        <h2>{taskList.name}</h2>
      </div>
    </div>
  );
}

export default SharingTopBar;

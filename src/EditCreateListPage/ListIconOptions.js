import "./ListIconOptions.css";
import ListIcon from "./ListIcon";

function ListIconOptions(props) {
  const iconOptions = [
    "globe-africa",
    "broom",
    "gifts",
    "baseball-ball",
    "list-alt",
    "shopping-basket",
    "seedling",
    "book",
    "football-ball",
    "carrot",
    "phone",
    "briefcase",
    "music",
    "user-friends",
    "heart",
    "puzzle-piece",
    "microscope",
    "address-book",
    "baby-carriage",
    "umbrella-beach",
    "cat",
    "basketball-ball",
    "ghost",
    "lemon",
    "address-card",
    "ice-cream",
    "socks",
    "bicycle",
    "paper-plane",
    "pills",
  ];

  return (
    <div className="icon-options">
      {iconOptions.map((icon) => (
        <ListIcon
          iconName={icon}
          selected={props.tempSelectedIcon === icon}
          key={icon}
          tempSelectedIcon={props.tempSelectedIcon}
          onChangeListIcon={props.onChangeListIcon}
          onChangePage={props.onChangePage}
        />
      ))}
    </div>
  );
}

export default ListIconOptions;

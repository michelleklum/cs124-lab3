function EnterListArrow(props) {
  return (
    <i
      className="fas fa-chevron-right fa-4x right-aligned"
      id="enter-list"
      onClick={props.onListIconClick}
    ></i>
  );
}

export default EnterListArrow;

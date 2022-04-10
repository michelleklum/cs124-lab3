function EnterListArrow(props) {
  let largeScreenName = props.isLargeScreen ? "large-screen-arrow" : ""

  return (
    <i
      className={`fas fa-chevron-right fa-4x right-aligned ${largeScreenName}`}
      id="enter-list"
    ></i>
  );
}

export default EnterListArrow;

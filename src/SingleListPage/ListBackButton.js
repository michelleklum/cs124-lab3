function ListBackButton(props) {
  function handleClick() {
    props.onChangePage("Home");
  }

  return (
    <i
      className="fas fa-chevron-left fa-4x"
      onClick={handleClick}
      role="button"
      tabIndex="0"
      aria-label={"Exit current list and return to home page"}
      onKeyDown={(e) =>
        e.code === "Enter" || e.code === "Space" ? handleClick() : null
      }
    ></i>
  );
}

export default ListBackButton;

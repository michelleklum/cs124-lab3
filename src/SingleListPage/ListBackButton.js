function ListBackButton(props) {
  function handleClick() {
    props.onChangePage("Home");
  }

  return (
    <button
      className="list-back-button"
      onClick={handleClick}
      aria-label={"Exit current list and return to home page"}
    >
      <i className="fas fa-chevron-left fa-4x"></i>
    </button>
  );
}

export default ListBackButton;

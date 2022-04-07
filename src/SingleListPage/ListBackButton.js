function ListBackButton(props) {
  function handleClick() {
    props.onChangePage("Home");
  }

  return (
    <button className="list-back-button" onClick={handleClick}>
      <i
        className="fas fa-chevron-left fa-4x"
        aria-label={"Exit current list and return to home page"}
      ></i>
    </button>
  );
}

export default ListBackButton;

import "./SharedPerson.css";

function SharedPerson(props) {
  function handleRemovePerson() {
    // Remove this person's email from the array of emails that this list is shared with
    const updatedSharedWith = props.sharedWith.filter(
      (email) => email !== props.email
    );
    props.setSharedWith(updatedSharedWith);
    props.onEditList(props.currentListId, "sharedWith", updatedSharedWith);
  }

  return (
    <div className="shared-person">
      <p>{props.email}</p>
      <button
        className="remove-shared-person-button"
        onClick={handleRemovePerson}
        aria-label={`Remove list access from ${props.email}`}
      >
        <i className="fas fa-minus-circle"></i>
      </button>
    </div>
  );
}

export default SharedPerson;

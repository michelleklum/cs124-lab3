import CancelEditListButton from "./CancelEditListButton"
import ConfirmEditListButton from './ConfirmEditListButton';
import "./EditListTopBar.css";

function EditListTopBar(props) {
    return (
        <div className="edit-list-header top-bar">
            <div className="edit-list-header-content top-bar-content">
                <CancelEditListButton
                    onChangePage={props.onChangePage}
                    prevPage={props.prevPage}
                    onChangeListName={props.onChangeListName}
                    onChangeListIcon={props.onChangeListIcon}
                    onChangeList={props.onChangeList}
                    listName={props.tempListName}
                    listIcon={props.tempSelectedIcon} />
                <div className="list-name">
                    <label htmlFor="edit-list-name"
                        className="edit-list-name-label">List Name</label>
                    <input
                        type="text"
                        id="edit-list-name"
                        name="edit-list-name"
                        autoComplete="off"
                        value={props.tempListName}
                        maxLength="22"
                        autoFocus
                        onInput={e => props.onChangeListName(e.target.value)}
                    />
                </div>
                <ConfirmEditListButton
                    data={props.data}
                    prevPage={props.prevPage}
                    currentListId={props.currentListId}
                    currentListIcon={props.currentListIcon}
                    onChangePage={props.onChangePage}
                    onChangeList={props.onChangeList}
                    onChangeListName={props.onChangeListName}
                    onChangeListIcon={props.onChangeListIcon}
                    onEditList={props.onEditList}
                    onCreateList={props.onCreateList}
                    listName={props.tempListName}
                    listIcon={props.tempSelectedIcon}
                    inCreateListMode={props.inCreateListMode}
                    inEditListMode={props.inEditListMode}
                />
            </div>
        </div>
    )
}

export default EditListTopBar
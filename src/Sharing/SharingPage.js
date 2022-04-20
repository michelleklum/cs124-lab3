import React, { useState } from "react";
import "./SharingPage.css";
import SharingTopBar from "./SharingTopBar";
import AddSharedPersonInput from "./AddSharedPersonInput";
import SharedPerson from "./SharedPerson";
import StopSharingButton from "./StopSharingButton";
import RemoveFromSharedListButton from "./RemoveFromSharedListButton";
import StopSharingAlert from "./StopSharingAlert";
import RemoveFromSharedListAlert from "./RemoveFromSharedListAlert";
import UsageAlert from "../Global/UsageAlert";

function SharingPage(props) {
  const list = props.data.find((list) => list.id === props.currentListId);
  const isOwner = list.owner === props.user.uid;
  const [sharedWith, setSharedWith] = useState(list.sharedWith);

  // State and functions below handle alerts and warnings
  const [usageErrorMessage, setUsageErrorMessage] = useState("");
  const [showUsageAlert, setShowUsageAlert] = useState(false);
  function handleToggleUsageAlert() {
    setShowUsageAlert(!showUsageAlert);
  }

  const [showStopSharingAlert, setShowStopSharingAlert] = useState(false);
  function handleToggleStopSharingAlert() {
    setShowStopSharingAlert(!showStopSharingAlert);
  }

  const [showRemoveFromSharedListAlert, setShowRemoveFromSharedListAlert] =
    useState(false);
  function handleToggleRemoveFromSharedListAlert() {
    setShowRemoveFromSharedListAlert(!showRemoveFromSharedListAlert);
  }

  return (
    <div id="sharing-page">
      <SharingTopBar
        data={props.data}
        prevPage={props.prevPage}
        currentListId={props.currentListId}
        onChangePage={props.onChangePage}
      />
      <div className="sharing-page-content">
        <h3>Owner:</h3>
        <p>{list.ownerEmail}</p>
        <hr />
        <h3>Shared with:</h3>
        <AddSharedPersonInput
          currentListId={props.currentListId}
          sharedWith={sharedWith}
          setSharedWith={setSharedWith}
          onEditList={props.onEditList}
          setUsageErrorMessage={setUsageErrorMessage}
          onToggleUsageAlert={handleToggleUsageAlert}
        />
        {sharedWith
          .filter(
            (email) => email !== list.ownerEmail && email !== props.user.email
          )
          .sort()
          .map((email) => (
            <SharedPerson
              key={email}
              email={email}
              isOwner={isOwner}
              currentListId={props.currentListId}
              sharedWith={sharedWith}
              setSharedWith={setSharedWith}
              onEditList={props.onEditList}
            />
          ))}
        {isOwner &&
          sharedWith.filter((email) => email !== list.ownerEmail).length >
            0 && (
            <StopSharingButton
              onToggleStopSharingAlert={handleToggleStopSharingAlert}
            />
          )}
        {!isOwner && (
          <RemoveFromSharedListButton
            onToggleRemoveFromSharedListAlert={
              handleToggleRemoveFromSharedListAlert
            }
          />
        )}
      </div>
      {showStopSharingAlert && (
        <StopSharingAlert
          onToggleStopSharingAlert={handleToggleStopSharingAlert}
          user={props.user}
          currentListId={props.currentListId}
          setSharedWith={setSharedWith}
          onEditList={props.onEditList}
        />
      )}
      {showRemoveFromSharedListAlert && (
        <RemoveFromSharedListAlert
          onToggleRemoveFromSharedListAlert={
            handleToggleRemoveFromSharedListAlert
          }
          user={props.user}
          currentListId={props.currentListId}
          sharedWith={sharedWith}
          setSharedWith={setSharedWith}
          onEditList={props.onEditList}
          onChangePage={props.onChangePage}
        />
      )}
      {showUsageAlert && (
        <UsageAlert
          usageErrorMessage={usageErrorMessage}
          onToggleUsageAlert={handleToggleUsageAlert}
        />
      )}
    </div>
  );
}

export default SharingPage;
